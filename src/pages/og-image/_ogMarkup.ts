import { html } from "satori-html";
import { siteConfig } from "@/site.config";

// OG image markup - Cosmic theme with gradient background
// Use https://og-playground.vercel.app/ to design your own.
export const ogMarkup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-gradient-to-br from-[#0a0e27] via-[#1a1b3e] to-[#2d1b4e] text-[#e8e6ff]">
		<!-- Star decorations -->
		<div tw="absolute top-10 right-20 w-2 h-2 bg-white rounded-full opacity-80"></div>
		<div tw="absolute top-32 right-40 w-1 h-1 bg-white rounded-full opacity-60"></div>
		<div tw="absolute bottom-40 left-20 w-2 h-2 bg-white rounded-full opacity-70"></div>
		<div tw="absolute top-20 left-32 w-1 h-1 bg-white rounded-full opacity-50"></div>

		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6 text-[#a8a4d6]">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t-2 border-[#6b5dd3] text-white">
			<div tw="flex items-center">
				<div tw="w-10 h-10 bg-[#7b68ee] rounded-full mr-4 flex items-center justify-center">
					<div tw="w-6 h-6 bg-[#9d8df1] rounded-full"></div>
				</div>
				<p tw="text-2xl font-semibold">${siteConfig.title}</p>
			</div>
			<p tw="text-lg text-[#c9c6e8]">by ${siteConfig.author}</p>
		</div>
	</div>`;
