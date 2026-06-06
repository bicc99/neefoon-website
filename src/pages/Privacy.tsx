import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

function Privacy() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Neefoon</title>
        <meta name="description" content="Neefoon is built to collect as little as possible. No accounts, no advertising or analytics SDKs, no selling your data. Your precise location stays on your device." />
      </Helmet>
      <main className="doc reveal" data-reveal>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={"/"}>Home</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <Link to={"#"} className="crumbs__group">Legal</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">Privacy</span>
      </nav>

      <h1>Privacy Policy</h1>
      <p className="doc__lede">Neefoon is built around a simple principle: collect as little as possible. This policy explains what happens to data when you use the app.</p>

      <h2>1. What we do not collect</h2>
      <ul>
        <li>Neefoon does not require an account or sign-up.</li>
        <li>Neefoon does not use third-party advertising or analytics SDKs to track you across apps or websites.</li>
        <li>Neefoon does not sell, rent, or monetize your personal data.</li>
      </ul>

      <h2>2. Location</h2>
      <p>If you grant location permission, Neefoon uses your device's location <em>on-device</em> to center the map, show your position, and help you view air quality near you.</p>
      <p>Your precise device location is not sent to Neefoon's servers and is not stored by Neefoon outside your device.</p>
      <p>Map tile providers may receive ordinary network request information, such as your IP address and the map tiles requested, when the map loads.</p>

      <h2>3. Air quality and hotspot data</h2>
      <p>Neefoon fetches public air quality station data and fire hotspot data from Neefoon's backend and third-party data sources, such as public AQI networks and map or satellite data providers.</p>
      <p>Requests to Neefoon's backend are not tied to a user account. Some requests include app data needed to serve the feature, such as station IDs, ranking filters, or the requested data endpoint.</p>

      <h2>4. App integrity and security</h2>
      <p>Neefoon uses device attestation services, such as Apple App Attest and Google Play Integrity, to help confirm that requests come from a genuine app installation.</p>
      <p>For this security check, the app may send an attestation proof and server-provided nonce to Neefoon's backend. The backend returns a short-lived authorization token used to access protected app data.</p>
      <p>Neefoon stores this authorization token, its expiry time, and, on iOS, an App Attest key identifier in secure device storage. These are used for app security and abuse prevention, not advertising or tracking.</p>

      <h2>5. Local storage</h2>
      <p>Neefoon stores your language preference on your device.</p>
      <p>Neefoon may cache non-personal app resources, such as map styles, marker images, and downloaded display assets, so the app loads faster.</p>
      <p>Uninstalling the app removes ordinary local app data. Some secure-storage items may be handled by the operating system according to platform rules.</p>

      <h2>6. Crash diagnostics</h2>
      <p>If the app crashes, iOS or Android may send crash diagnostics to the app developer if you have enabled system-level diagnostics. These reports are controlled by your device settings and are used to understand and fix app crashes.</p>
      <p>Neefoon does not add a separate third-party crash analytics SDK.</p>

      <h2>7. Third-party services</h2>
      <p>Neefoon uses third-party services for map tiles, map styles, fonts, public air quality data, fire hotspot data, and external links such as the Neefoon website or social profiles.</p>
      <p>Those services may process requests according to their own privacy policies. Neefoon does not intentionally pass your precise device location, account information, or advertising identifiers to them.</p>

      <h2>8. Children</h2>
      <p>Neefoon is not directed at children under 13 and does not knowingly collect personal data from them.</p>

      <h2>9. Your rights</h2>
      <p>Because Neefoon does not create user accounts, we do not maintain an account profile for you to access, correct, or delete. If you have privacy questions or requests, contact us at <a href="mailto:support.neefoon@gmail.com" style={{color: "var(--teal-800)"}}>support.neefoon@gmail.com</a>.</p>

      <h2>10. Changes</h2>
      <p>If this policy changes, we will update the date below. For material changes, we may also surface a notice in the app.</p>

      <div className="doc__updated">Last updated: 6 June 2026</div>
    </main>
    </>
  );
}

export default Privacy;
