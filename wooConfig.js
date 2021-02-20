const wooConfig = {
	siteUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	graphqlUrl: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
};

module.exports = wooConfig;
