# My Self Hosted Portfolio, Blog and API - https://jazer.dev/
Built using a [ReactJS](https://reactjs.org/) Front-End, [Express](https://expressjs.com/) + [PostgreSQL](https://www.postgresql.org/) Back-End for [API](https://api.jazer.dev)

Hosted on a [Linux](https://www.linux.org/) [Ubuntu Server](https://ubuntu.com/), connections brokered by [NGINX](https://www.nginx.com/) and served with standard [NodeJS HTTP](https://nodejs.org/docs/latest/api/http.html#http_http) module

All code tracked with [git](https://git-scm.com/) and code hosted on [GitHub](https://github.com/jazerbarclay/jazer.dev)

## Routes
Path Route | Domain Route (redirect) | Content
--|--|--
jazer.dev | www.jazer.dev | Landing / Homepage with links to my blog, courses and portfolio
jazer.dev/api | api.jazer.dev | The API that manages the blog, guides and courses posted
jazer.dev/about | about.jazer.dev | My portfolio showcasing my best work and a bit about me (Pulled from jazer.co.uk)
jazer.dev/blog | blog.jazer.dev | My personal blog containing guides and other learning
jazer.dev/courses | courses.jazer.dev | Curated tutorials to teach concepts and give experience
jazer.dev/admin | admin.jazer.dev | Admin area for me to manage posts, featured articles and courses