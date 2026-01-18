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

    # compile all MDX posts to catch MDX/component runtime errors
    bun run test:mdx

    # run all the quick checks
    bun run lint:all
    ```

Notes

- Vale requires a `styles/` folder if you want stronger rules; a basic `.vale.ini` is included.
- The `test-mdx` script uses the repo's `lib/mdx.ts` to compile posts with the same pipeline used by the site. It uses `tsx` to run TypeScript directly.
- GitHub Actions workflow is included to run these checks on PRs.
