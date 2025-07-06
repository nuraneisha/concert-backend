import puppeteer, { executablePath } from "puppeteer";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: executablePath(), // ✅ key fix
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        const url =
            "https://www.bandsintown.com/c/kuala-lumpur-malaysia?came_from=253&sort_by_filter=Number+of+RSVPs&concerts=true";
        await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 60000,
        });

        await autoScroll(page);

        await page.waitForSelector(".AtIvjk2YjzXSULT1cmVx");

        const events = await page.$$eval(".AtIvjk2YjzXSULT1cmVx", (nodes) =>
            nodes.map((el) => ({
                name: el.querySelector("._5CQoAbgUFZI3p33kRVk")?.innerText.trim() || "",
                location: el.querySelector(".bqB5zhZmpkzqQcKohzfB")?.innerText.trim() || "",
                date: el.querySelector(".r593Wuo4miYix9siDdTP > div")?.innerText.trim() || "",
                image: el.querySelector("img")?.src || "",
            }))
        );

        await browser.close();
        res.status(200).json(events.filter((e) => e.name));
    } catch (error) {
        console.error("Scraping failed:", error.message);
        res.status(500).json({ error: "Scraping failed", details: error.message });
    }
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}
