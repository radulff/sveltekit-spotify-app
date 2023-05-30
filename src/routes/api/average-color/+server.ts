import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import sharp from "sharp";

export const GET: RequestHandler = async ({ url, fetch }) => {
    const imageURL = url.searchParams.get('image');

    if (imageURL) {
        const image = await fetch(imageURL).then((res) => res.arrayBuffer());
        const stats = await sharp(Buffer.from(image)).stats();

        const [r, g, b] = stats.channels.map(channel => channel.mean);
        return json({ color: `rgba(${r}, ${g}, ${b})` })
    }

    return json({ color: null })
}