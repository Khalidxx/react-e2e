let blogPosts = [];

describe("Blog - kodziak.com/blog/", () => {
	// Will trigger methods before tests

	beforeAll(async () => {
		// Load blog page

		await page.goto("https://kodziak.com/blog/");
	});


	test('title should be "Blog | Przemysław Paczoski"', async () => {
		// Get website title

		const title = await page.title();

		// Compare title of current page

		expect(title).toBe("Blog | Przemysław Paczoski");
	});

	test("should display list of blog posts", async () => {
		// Get all blog posts as an array of objects

        console.log("Starting test 2...")
		blogPosts = await page.$$eval("css=.posts", (elems) => {
            console.log("posts:", elems)
            return elems.map((el) => {
				return {
					title: el.querySelector(".post-title").textContent.trim(),

					description: el
						.querySelector(".post-description")
						.textContent.trim(),

					href: el.href,
				};
			})
        });

		// Check if list length is greater than 0

		expect(blogPosts.length).toBeGreaterThan(0);
	});

	test("click on blog post should redirect to article", async () => {
		// Go to first blog post, there we're waiting to resolve all promises from array

		await Promise.all([
			// Click oo .post-title css class element

			page.click("css=.post-title"),

			// Wait for networkidle event, promise resolves after event

			page.waitForLoadState("networkidle"),
		]);

		// Get title, content and href of current article

		const [articleTitle, articleContent, articleHref] = await Promise.all([
			// Get article title, we use here array destructuring

			page.$eval("css=h2", (el) => el.textContent.trim()),

			// Get article content

			page.$eval("css=.content", (el) => el.textContent),

			// Get article href

			page.url(),
		]);

		// Destructuring first element from an blog posts array. First we use array destructuring and then object destructuring

		const [{ title, description, href }] = blogPosts;

		// Compare title from posts list with current article's title

		expect(title).toBe(articleTitle);

		// Check if the current article content includes description from posts list, compare output with boolean true

		expect(articleContent.includes(description)).toBe(true);

		// Compare href from posts list with current article's href

		expect(href).toBe(articleHref);
	});

});
