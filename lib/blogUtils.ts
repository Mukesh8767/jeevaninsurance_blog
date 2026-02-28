export const BLOG_DOMAIN = "https://hostelurls"; // User placeholder
export const NEWS_DOMAIN = "https://hosteddomain"; // User placeholder

export function getPostUrl(post: any) {
    const categorySlug = post.categories?.slug || post.category?.slug || 'uncategorized';
    const subcategorySlug = post.subcategories?.slug || post.subcategory?.slug || 'none';
    const postSlug = post.slug;

    // Determine if it's a news or blog (post)
    const type = post.post_type === 'news' ? 'news' : 'post';

    // As per user request: hosteddomain/hostelurls means just after the domain root
    // e.g. http://localhost:3000/blogs/post/...
    return `/blogs/${type}/${categorySlug}/${subcategorySlug}/${postSlug}`;
}
