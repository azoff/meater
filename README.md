# meater

A service to parse food reccomendation sites like eater and add their reccomendations to a spreadsheet, ultimately powering a map of reccomendations.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## TODO

- [ ] Add some heuristic for vegetarian/vegan reccomendations
- [ ] Add some heuristic for bakeries and coffee shops
- [ ] Dockerize service
- [ ] Deploy service to nuc
- [ ] Support GET requests as well
- [ ] Add DNS rules to post to NUC
- [ ] Add shortlink for map, maybe GET without any parameters, driven by env