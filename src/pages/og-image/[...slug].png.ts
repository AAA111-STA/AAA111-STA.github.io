import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { getAllPosts } from "@/data/post";
import { getFormattedDate } from "@/utils/date";
import { readCache, writeToCache } from "./_cacheUtil";
import { ogMarkup } from "./_ogMarkup";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	// check the og-image cache
	let pngBuffer = readCache(title, pubDate);
	if (!pngBuffer) {
		try {
			console.info(`Generating new OG image for: ${title}`);
			const postDate = getFormattedDate(pubDate, {
				month: "long",
				weekday: "long",
			});
			const svg = await satori(ogMarkup(title, postDate), ogOptions);
			pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
			writeToCache(title, pubDate, pngBuffer);
		} catch (err) {
			console.warn(`OG image failed for "${title}", using fallback:`, (err as Error).message);
			pngBuffer = await sharp({
				create: { width: 1200, height: 630, channels: 4, background: { r: 10, g: 14, b: 39, alpha: 1 } },
			}).png().toBuffer();
		}
	}

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.values()
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.id },
			props: {
				pubDate: post.data.updatedDate ?? post.data.publishDate,
				title: post.data.title,
			},
		}))
		.toArray();
}
