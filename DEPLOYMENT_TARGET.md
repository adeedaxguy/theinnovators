# Deployment Target

For this project, deploy production builds to the client Vercel project:

- Vercel scope: `innovatorsinstitute`
- Vercel project: `theinnovators`
- Production alias: `https://theinnovators-two.vercel.app`
- Client GitHub repo: `https://github.com/innovatorsverse/landingpage`

Use the saved local client Vercel profile:

```bash
vercel --global-config /Users/adeedaxguy/.config/innovators-vercel-client deploy --prod --yes --scope innovatorsinstitute
```

The profile is local only and should not be committed into the repository.
