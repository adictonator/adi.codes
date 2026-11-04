Developer setup and linting (Bun)

This project uses Bun as the package manager/runtime for quick local checks and scripts.

Recommended dev tools to install (Bun + Homebrew where noted):

1. Install Bun (if not already installed)

    macOS (one-liner):

    ```bash
    curl -fsSL https://bun.sh/install | bash
    # Then restart your shell or run:
    export PATH="$HOME/.bun/bin:$PATH"
    ```

2. Install Vale (prose linter). Vale is easiest to install with Homebrew on macOS:

    ```bash
    brew install vale
    ```

    If you cannot use Homebrew, download the binary from https://vale.sh

3. Add the JavaScript-based dev tools using Bun:

    ```bash
    # from repo root
    bun add -d markdownlint-cli remark remark-cli remark-lint remark-gfm markdown-link-check alex tsx
    ```

    This will install the CLIs used by the npm scripts in `package.json`.

4. Run the linters/tests

    ```bash
    # lint markdown
    bun run lint:md

    # check external/internal links
    bun run check-links

    # prose lint (vale)
    bun run lint:prose

    # compile all MDX posts with the site's MDX setup
    bun run test:mdx

    # run all the quick checks
    bun run lint:all
    ```

Notes

- Vale requires a `styles/` folder if you want stronger rules; a basic `.vale.ini` is included.
- `test:mdx` compiles every post with `@mdx-js/mdx` + `remark-gfm`, the same MDX setup the site uses, and reports syntax errors with line numbers. Drafts are reported but only published posts fail the run.
- `bun run lint` uses `eslint.config.mjs` (flat config, `next/core-web-vitals`). It currently crashes inside `@typescript-eslint` because the repo is on TypeScript 7, which doesn't expose the JS API typescript-eslint needs; `bun run typecheck` works. Writing and publishing posts is covered in `BLOGGING.md`.
