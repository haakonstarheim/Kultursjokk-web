# Frivilligskjema — oppsett

_Opprettet 2026-07-01_

Frivilligskjemaet lar folk melde seg som frivillige til et arrangement via en
delbar lenke. Påmeldingen leveres på to kanaler: **e-post** (pen oppsummering
til vaktansvarlig) og en valgfri **Google Sheet-logg** (samlet oversikt).

## Slik henger det sammen

| Del | Fil |
| --- | --- |
| Datamodell (mottaker + vakter pr. arrangement) | `lib/events.ts` |
| Skjemaside (én pr. arrangement) | `app/arrangementer/[slug]/frivillig/page.tsx` |
| Selve skjemaet (klient) | `components/ui/volunteer-form.tsx` |
| Innsending / e-post / logg | `app/api/frivillig/route.ts` |
| «Bli frivillig»-lenke | `app/arrangementer/page.tsx` |

Lenken du deler er arrangements-spesifikk, f.eks.:

```
https://kultursjokk.no/arrangementer/konkret-kultursjokk/frivillig
```

## Mottaker pr. arrangement

Hvert arrangement bestemmer selv hvem påmeldinger går til, via feltet
`volunteerEmail` i `lib/events.ts`:

```ts
volunteerEmail: "michaelfurnes@gmail.com",
```

Neste arrangement setter bare en annen adresse — ingen annen kodeendring
trengs. Mangler feltet, er skjemaet stengt for det arrangementet (siden gir
404, og «Bli frivillig»-lenken vises ikke).

Vaktene som vises kan også tilpasses pr. arrangement via `volunteerShifts`.
Utelates de, brukes `DEFAULT_VOLUNTEER_SHIFTS` (Rigging / Under arrangement /
Nedrigg).

## 1. E-post (Resend)

1. Lag konto på [resend.com](https://resend.com) og hent en API-nøkkel.
2. Verifiser avsenderdomenet `kultursjokk.no` (Resend → Domains). Til testing
   kan du hoppe over dette og bruke `onboarding@resend.dev` som avsender.
3. Sett miljøvariabler (lokalt i `.env.local`, på Netlify under
   _Site settings → Environment variables_):

   ```
   RESEND_API_KEY=re_xxxxxxxx
   EMAIL_FROM=Kultursjokk <frivillig@kultursjokk.no>
   ```

Svar-adressen (`reply_to`) settes automatisk til den frivilliges e-post, så
vaktansvarlig kan svare direkte fra innboksen.

## 2. Google Sheet-logg (valgfritt)

Denne bruker en Google Apps Script-web-app som webhook — ingen tjenestekonto,
ingen nøkler i koden. Bare en URL i miljøvariabelen `GOOGLE_SHEET_WEBHOOK_URL`.

1. Lag et nytt Google Sheet. Legg gjerne en overskriftsrad i rad 1:
   `Tidspunkt | Arrangement | Navn | E-post | Telefon | Nødkontakt | Nødkontakt tlf. | Relasjon | Kost/allergi | Vakter | Kommentar`
2. **Utvidelser → Apps Script**, og lim inn:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([
       d.submittedAt, d.event, d.fullName, d.email, d.phone,
       d.ecName, d.ecPhone, d.ecRelation, d.dietary, d.shifts, d.notes,
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Distribuer → Ny distribusjon → Web-app**. Kjør som deg selv, gi tilgang
   til «Alle». Kopiér web-app-URL-en.
4. Sett miljøvariabelen:

   ```
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/xxxx/exec
   ```

La variabelen stå tom om du kun vil bruke e-post.

## Leveringslogikk (kort)

- Begge kanaler konfigurert → e-post + rad i arket.
- Kun e-post → sender e-post.
- Kun Sheet → logger til arket.
- Ingen konfigurert → skjemaet svarer 500 (så feilen oppdages tidlig).
- E-post er primærkanal: feiler den, får brukeren beskjed om å prøve igjen, så
  ingen påmelding går tapt i det stille.

## Personvern

- **Ingen ID-opplasting** i skjemaet — legitimasjon sjekkes fysisk i døra. Vi
  samler ikke inn eller sender sensitive dokumenter.
- Skjemaet krever aktivt samtykke, og teksten sier at data kun brukes til å
  organisere frivillige og slettes etter arrangementet. Husk å faktisk slette
  arket / e-postene etterpå.

## Spam-beskyttelse

Honeypot-felt (`company`) fanger de fleste bots, pluss enkel rate-limiting pr.
IP i API-route-en. Trengs mer, kan et CAPTCHA (f.eks. Cloudflare Turnstile)
legges til senere.
