# Kultursjokk Web

Offisiell nettside og billettplattform for **Kultursjokk AS** — et eventkollektiv basert i Ålesund som skaper alternative musikk- og kulturarrangementer i utradisjonelle lokasjoner.

## Teknisk stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** (Postgres) for database — *kommer i Fase 5*
- **Stripe Checkout** for billettsalg — *kommer i Fase 6*
- **Resend** for billett-e-post — *kommer i Fase 7*
- **Netlify** for hosting

## Designprinsipper

1. **Svart, hvitt, grå — ingenting mer.** Ingen farger under noen omstendighet.
2. **Skarpe hjørner.** Ingen rounded corners.
3. **Typografi er kongen.** Anton for display, Inter for brødtekst, JetBrains Mono for metadata.
4. **Negativ space.** Mye svart. La innholdet puste.
5. **Brutalistisk minimalisme** — inspirert av bunker-estetikk og undergrunns-rave.

## Lokal utvikling

```bash
npm install
cp .env.local.example .env.local   # fyll inn etter hvert som vi legger til tjenester
npm run dev
```

Åpne http://localhost:3000

## Mappestruktur

```
kultursjokk-web/
├── app/              # Next.js App Router (sider, layouts)
│   ├── layout.tsx    # Root layout med fonter og metadata
│   ├── page.tsx      # Forside (foreløpig designsystem-demo)
│   ├── fonts.ts      # Font-import (Anton, Inter, JetBrains Mono)
│   └── globals.css   # Globale stiler + Tailwind base
├── components/       # Gjenbrukbare UI-komponenter
│   └── ui/
├── lib/              # Hjelpefunksjoner, klienter (Supabase, Stripe)
├── public/           # Statiske filer (bilder, favicon)
│   └── images/
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Faseinndeling

| Fase | Beskrivelse | Status |
|------|-------------|--------|
| 1 | Prosjekt-oppsett + designsystem | ✅ |
| 2 | Landing page | ⏳ |
| 3 | Arrangementsside (KORSA) | ⏳ |
| 4 | Om oss + Resident DJs | ⏳ |
| 5 | Supabase database + seed | ⏳ |
| 6 | Stripe Checkout + webhook | ⏳ |
| 7 | Billett på e-post (Resend + QR) | ⏳ |
| 8 | Deploy Netlify + kultursjokk.no | ⏳ |
