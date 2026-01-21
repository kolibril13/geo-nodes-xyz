# Tree Clipper Sharing Platfrom🌲

A community platform for sharing Blender geometry node trees. Upload, browse, and copy node setups with a single click.

Can be used togehter with this Blender extension: 
https://github.com/Algebraic-UG/tree_clipper

## Community

Join the Discord: [discord.gg/T8wwzGQ8Ax](https://discord.gg/T8wwzGQ8Ax)


## Features

- **Browse Assets** – View community-uploaded geometry node trees
- **One-Click Copy** – Copy asset data directly to clipboard for pasting into Blender
- **Discord Auth** – Log in with Discord to upload your own assets
- **Preview Images** – Attach screenshots to your uploads
- **Cloudflare Workers** – Fast, globally distributed backend

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (static files in `/public`)
- **Backend**: Cloudflare Workers (`/src/index.js`)
- **Database**: Supabase (PostgreSQL + Storage)
- **Auth**: Supabase Auth with Discord OAuth



## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npx wrangler dev
```

## License

See [LICENSE](LICENSE) for details.
