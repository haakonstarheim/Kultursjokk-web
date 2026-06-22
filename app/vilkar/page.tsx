import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

/**
 * Vilkår — Terms & Conditions
 * ===========================
 *
 * Rute: /vilkar
 *
 * Kjøps- og deltakervilkår for billetter til Kultursjokk-arrangementer.
 * Siden er ment å lenkes til fra billettsalget (Billetto) og fra
 * forsiden/arrangementssidene.
 *
 * ⚠️  VIKTIG TIL HÅKON:
 * Dette er et profesjonelt UTKAST tilpasset norske billettsalg — det
 * er IKKE juridisk rådgivning. Felter merket [i hakeparentes] må fylles
 * inn (org.nr m.m.), og teksten bør gjennomgås av en jurist før den
 * regnes som bindende. Sentrale referanser: angrerettloven § 22 bokstav m
 * (unntak fra angrerett for fritidsarrangement på bestemt dato),
 * markedsføringsloven og personopplysningsloven (GDPR).
 *
 * Innholdet er strukturert som nummererte seksjoner for lesbarhet og
 * for at billettkjøper enkelt skal kunne referere til et punkt.
 */

export const metadata: Metadata = {
  title: "Vilkår — Kultursjokk",
  description:
    "Kjøps- og deltakervilkår for billetter til Kultursjokk-arrangementer.",
};

// Sist oppdatert — husk å endre når vilkårene revideres.
const LAST_UPDATED = "22.06.2026";

export default function VilkarPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* ── Topp ──────────────────────────────────────────── */}
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
            Kjøps- og deltakervilkår
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.0] uppercase text-ink-900">
            Vilkår
          </h1>
          <p className="mt-6 font-mono text-[10px] tracking-meta uppercase text-ink-600">
            Sist oppdatert {LAST_UPDATED}
          </p>

          <p className="mt-10 text-base md:text-lg text-ink-800 leading-relaxed">
            Disse vilkårene gjelder for kjøp av billetter til, og deltakelse
            på, arrangementer i regi av Kultursjokk AS. Ved å kjøpe billett
            aksepterer du vilkårene. Les dem derfor nøye før du gjennomfører
            kjøpet.
          </p>

          {/* ── Seksjoner ────────────────────────────────────── */}
          <div className="mt-16 flex flex-col gap-14">
            <Section n="01" title="Arrangør">
              <p>
                Arrangør og avtalepart er <strong className="text-ink-900">Kultursjokk AS</strong>{" "}
                (org.nr 937&nbsp;420&nbsp;900), Ålesund. Kontakt:{" "}
                <a
                  href="mailto:haakonstarheim@gmail.com"
                  className="text-ink-900 underline hover:text-ink-900"
                >
                  haakonstarheim@gmail.com
                </a>
                . Selve billettsalget gjennomføres via vår billettpartner
                Billetto, som håndterer betaling og kvittering på vegne av
                arrangøren.
              </p>
            </Section>

            <Section n="02" title="Billettkjøp og betaling">
              <p>
                Billetter kjøpes gjennom Billetto. Et kjøp er bindende når
                betalingen er gjennomført og du har mottatt bekreftelse på
                e-post. Oppgitt pris inkluderer merverdiavgift der dette er
                aktuelt. Billettpartneren kan kreve et eget service-/avgiftsgebyr
                som kommer i tillegg til billettprisen; dette opplyses før kjøpet
                fullføres. Du er selv ansvarlig for at e-postadressen du oppgir
                er korrekt, slik at billetten kommer frem.
              </p>
            </Section>

            <Section n="03" title="Billetten">
              <p>
                Billetten sendes digitalt og fremvises ved inngangen (på mobil
                eller utskrift). Hver billett har en unik kode som kun kan
                benyttes én gang — den første som registreres ved inngangen er
                gyldig. Oppbevar billetten trygt og del den ikke offentlig;
                arrangøren er ikke ansvarlig for billetter som er kopiert,
                stjålet eller videresolgt av tredjepart.
              </p>
            </Section>

            <Section n="04" title="Aldersgrense og legitimasjon">
              <p>
                Med mindre annet er oppgitt for det enkelte arrangement er
                aldersgrensen <strong className="text-ink-900">18 år</strong>.
                Gyldig legitimasjon med bilde må kunne fremvises ved inngangen.
                Gjester som ikke kan dokumentere alder, kan nektes adgang uten
                rett til refusjon.
              </p>
            </Section>

            <Section n="05" title="Hemmelig lokasjon">
              <p>
                For arrangementer merket «secret location» offentliggjøres ikke
                adressen på forhånd. Nøyaktig lokasjon og praktisk informasjon
                sendes til billettkjøpere i forkant av arrangementet, til den
                e-postadressen som ble brukt ved kjøp. Følg også både
                Kultursjokks og Konkrets kanaler for oppdateringer.
              </p>
            </Section>

            <Section n="06" title="Angrerett">
              <p>
                Billetter til kultur- og fritidsarrangementer som finner sted på
                en bestemt dato er <strong className="text-ink-900">unntatt fra
                angreretten</strong> etter angrerettloven § 22 bokstav m. Det er
                derfor ikke 14 dagers angrerett på kjøp av billett. Et gjennomført
                billettkjøp refunderes som hovedregel ikke, med unntak av
                tilfellene beskrevet i punkt 7.
              </p>
            </Section>

            <Section n="07" title="Avlysning, flytting og refusjon">
              <p>
                Blir et arrangement <strong className="text-ink-900">avlyst</strong>,
                refunderes billettprisen. Eventuelle service-/billettgebyr fra
                billettpartner refunderes i henhold til partnerens vilkår og er
                ikke nødvendigvis omfattet. Blir arrangementet{" "}
                <strong className="text-ink-900">flyttet</strong> til ny dato
                eller lokasjon, beholder billetten sin gyldighet. Refusjon
                utbetales til betalingsmiddelet som ble brukt ved kjøp, normalt
                innen rimelig tid etter at avlysningen er kunngjort. Krav om
                refusjon rettes til arrangøren på e-post.
              </p>
            </Section>

            <Section n="08" title="Adgang, husregler og bortvisning">
              <p>
                Arrangøren kan av sikkerhetsmessige hensyn gjennomføre visitasjon
                ved inngangen. Våpen, narkotika, pyroteknikk og medbragt drikke
                er forbudt. Personer som er åpenbart ruspåvirket, opptrer truende
                eller bryter husreglene, kan nektes adgang eller bortvises uten
                rett til refusjon. Anvisninger fra vakter og arrangør skal følges.
                Inngang kan stenges ved kapasitet — en gyldig billett garanterer
                adgang frem til oppgitt innslippstid, men ikke nødvendigvis ved
                svært sen ankomst.
              </p>
            </Section>

            <Section n="09" title="Sikkerhet og eget ansvar">
              <p>
                Deltakelse skjer på eget ansvar. Arrangementene kan inneholde
                høyt lydnivå, lyseffekter (herunder stroboskop) og folkemengder;
                vi anbefaler hørselsvern. Gjester med helsemessige forhold som
                kan påvirkes av dette bør ta nødvendige forholdsregler. Arrangøren
                er ikke ansvarlig for tap av eller skade på medbragte eiendeler.
              </p>
            </Section>

            <Section n="10" title="Endringer i program">
              <p>
                Annonsert lineup og program kan endres. Endringer i lineup,
                spilletider eller enkeltartister gir ikke i seg selv rett til
                refusjon, så lenge arrangementet gjennomføres.
              </p>
            </Section>

            <Section n="11" title="Foto og film">
              <p>
                Det kan bli tatt bilder og video under arrangementet til bruk i
                Kultursjokks markedsføring. Ved å delta samtykker du til at slikt
                materiale kan publiseres. Ønsker du ikke å være med på bilder, gi
                beskjed til fotograf eller arrangør på stedet, så strekker vi oss
                langt for å imøtekomme det.
              </p>
            </Section>

            <Section n="12" title="Personvern">
              <p>
                Personopplysninger du oppgir ved kjøp behandles for å gjennomføre
                kjøpet, sende deg billett og praktisk informasjon, og i tråd med
                personopplysningsloven (GDPR). Billettpartneren Billetto er
                behandlingsansvarlig for opplysninger som registreres i deres
                løsning. Spørsmål om personvern, innsyn eller sletting rettes til{" "}
                <a
                  href="mailto:haakonstarheim@gmail.com"
                  className="text-ink-900 underline hover:text-ink-900"
                >
                  haakonstarheim@gmail.com
                </a>
                .
              </p>
            </Section>

            <Section n="13" title="Force majeure">
              <p>
                Ved forhold utenfor arrangørens kontroll — herunder pålegg fra
                myndigheter, ekstremvær, brann, strømbrudd eller lignende — kan
                arrangementet bli endret, utsatt eller avlyst. I slike tilfeller
                gjelder refusjonsreglene i punkt 7 så langt de passer.
              </p>
            </Section>

            <Section n="14" title="Lovvalg og tvister">
              <p>
                Vilkårene reguleres av norsk rett. Er du forbruker og uenig med
                arrangøren, kan du kontakte oss for å finne en løsning. Tvister
                som ikke løses i minnelighet kan bringes inn for Forbrukertilsynet
                / Forbrukerklageutvalget eller de alminnelige domstoler.
              </p>
            </Section>
          </div>

          {/* ── Bunntekst ─────────────────────────────────────── */}
          <div className="mt-20 border-t border-ink-300 pt-8">
            <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
              Kultursjokk AS — Ålesund · Kontakt:{" "}
              <a
                href="mailto:haakonstarheim@gmail.com"
                className="text-ink-800 hover:text-ink-900"
              >
                haakonstarheim@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * En nummerert vilkårsseksjon: liten mono-label + display-tittel +
 * brødtekst. Brødteksten styles felles via `prose`-lignende klasser.
 */
function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink-300 pt-8">
      <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
        {n}
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.05] uppercase text-ink-900">
        {title}
      </h2>
      <div className="mt-5 text-[15px] md:text-base text-ink-800 leading-relaxed [&_a]:transition-colors">
        {children}
      </div>
    </section>
  );
}
