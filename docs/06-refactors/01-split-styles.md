# Refactor: Split Stylesheet

## Rationale

`styles.css` sudah terlalu besar dan mencampur banyak domain (layout, cover, parallax, komponen UI). Ini meningkatkan risiko konflik selector dan mempersulit navigasi.

## Change

Styles dipisah per fungsi menjadi beberapa file di `src/assets/styles/`:

- `base.css`: root variables + reset dasar.
- `layout.css`: layout, grid, topnav, section.
- `cover.css`: cover header + animasi cover.
- `parallax.css`: scene, parallax, dekorasi.
- `components.css`: UI components (buttons, cards, form, footer, reveal).
- `modal.css`: modal styles.

File `src/assets/styles.css` menjadi aggregator via `@import`.

## Follow-up

Jika jumlah style bertambah, pertimbangkan grouping per section atau CSS Modules untuk isolasi lebih kuat.
