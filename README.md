https://jondlm.github.io/graph/

A little web app for playing with directed graphs.

# Developing

Run `pnpm dev` and browse to http://localhost:1234

# Deploying

This repo uses an orphan branch `gh-pages` that contains the built static
assets. There's a script that handles the entire build/deploy process.

Commit changes to `main` then run `./scripts/deploy-gh-pages`.

Profit.
