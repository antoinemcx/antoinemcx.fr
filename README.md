# <a href="https://antoinemcx.fr"><code><img height="26" src="/public/logo.ico"></code> antoinemcx.fr (v3)</a>

🌐 My personal website and portfolio, built with [Nuxt.js 4](https://nuxt.com/), TypeScript and [TailwindCSS](https://tailwindcss.com/).
<br><br>

## Getting Started
### Development
1. Clone the repository: `git clone https://github.com/antoinemcx/antoinemcx.fr.git <YOUR_PROJECT_NAME>`
2. Install the dependencies: `npm install`
3. Run the development server: `npm run dev`
4. The website is up on [localhost:3000](http://localhost:3000) 🚀

### Production
#### With Docker (recommended)
1. Clone the repository: `git clone https://github.com/antoinemcx/antoinemcx.fr.git <YOUR_PROJECT_NAME>`
2. Authenticate to the ghcr.io GitHub Container Registry with `docker login ghcr.io -u <GITHUB_USERNAME> -p <GITHUB_PAT>`.  
   The GitHub PAT (Personal Access Token) must have been created with the `read:packages` scope in your [GitHub settings](https://github.com/settings/tokens/new).
3. If you the [Traefik](https://traefik.io/traefik) reverse proxy, update [`docker-compose.yml`](docker-compose.yml):
   - Change the domain name in the Traefik `Host` rule
   - Change the network name "traefik-proxy" according to your Traefik configuration
4. Build and start the container: `docker compose up -d --build`
5. The website is up on port **9000** and accessible via your domain 🚀

> [!NOTE]
> The Docker image is published on the [GitHub Container Registry](https://ghcr.io/antoinemcx/antoinemcx.fr:latest) on each push to the `master` branch.  
> If you don't have automatic pulls on your server, use `docker compose pull` and `docker compose up -d` in the project to update the container.

#### Without Docker
1. Clone the repository: `git clone https://github.com/antoinemcx/antoinemcx.fr.git <YOUR_PROJECT_NAME>`
2. Install the dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the production server: `node ./.output/server/index.mjs`
5. The website is up on port **3000** 🚀

> [!TIP]
> To use a different port, set the `PORT` environment variable:  
> - Linux/macOS: `PORT=9000 node ./.output/server/index.mjs`
> - Windows (PowerShell): `$env:PORT=9000; node ./.output/server/index.mjs`

<br>

## Website archives
In this repository, you will also find branches prefixed with `archive/*`.  
These are older versions of my website. Don't hesitate to check them out:
- [archive/v0-meliooff.xyz-ejs](https://github.com/antoinemcx/antoinemcx.fr/tree/archive/v0-meliooff.xyz-ejs) · My first portfolio, a Discord profile clone (2021)
- [archive/v1-antoinemcx.fr-ejs](https://github.com/antoinemcx/antoinemcx.fr/tree/archive/v1-antoinemcx.fr-ejs) · Previous published website (2023)
- [archive/v1-antoinemcx.fr-nextjs](https://github.com/antoinemcx/antoinemcx.fr/tree/archive/v1-antoinemcx.fr-nextjs) · Redesign with Next.js, abandoned (2024)
- [master](https://github.com/antoinemcx/antoinemcx.fr) · Complete redesign with Nuxt.js 4, and current published version (2025)

<br>

## Support me
If you like the project, feel free to put a ⭐ !  
You can also join my [discord server](https://antoinemcx.fr/discord) if you want to have a word or two with me.

## More
Found an error? Please create a GitHub issue or a ticket on my [discord server](https://antoinemcx.fr/discord).  
This repository is licensed under the Apache-2.0 License. See the LICENSE file ([here](LICENSE)) for more information.
