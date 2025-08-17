export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "slate",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      variants: {
        variant: {
          link: "p-0! underline underline-offset-4 text-default! hover:text-highlighted!",
        },
      },
    },
    card: {
      slots: {
        header: "p-3 sm:px-4",
        body: "p-3 sm:p-4",
        footer: "p-3 sm:px-4",
      },
    },
  },
});
