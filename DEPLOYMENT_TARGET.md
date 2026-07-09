# Deployment Target

For this project, deploy production builds to the client Vercel project:

- Vercel scope: `innovatorsinstitute`
- Vercel project: `theinnovators`
- Production alias: `https://theinnovators-two.vercel.app`
- Client GitHub repo: `https://github.com/innovatorsverse/landingpage`

Use the isolated client Vercel profile when available:

```bash
vercel --global-config /tmp/innovators-vercel-client deploy --prod --yes --scope innovatorsinstitute
```
