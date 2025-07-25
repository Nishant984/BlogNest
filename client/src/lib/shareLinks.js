export const generateShareLinks = ({ title, slug }) => {
  const postUrl = `${window.location.origin}/${slug}`;
  const fullTitle = `${title} - BlogNest`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(fullTitle);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedTitle}&body=Check out this post: ${encodedUrl}&tf=1`,
  };
};
