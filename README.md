# meater

A service to parse food reccomendation sites like eater and add their reccomendations to a spreadsheet, ultimately powering a map of reccomendations.

(1) Install Dependencies

```bash
bun install
```

(2) Setup Environment

```bash
cp .env.example .env
open .env
```

(3) Run Service

```bash
bun dev # or `bun start` for production 
```

## TODO

- [ ] Add DNS rules to post to NUC
- [ ] Add shortlink for map, maybe GET without any parameters, driven by env