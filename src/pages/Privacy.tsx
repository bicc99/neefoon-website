import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

function Privacy() {
  useReveal();
  return (
    <main className="doc reveal" data-reveal>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={"/"}>Home</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <Link to={"#"} className="crumbs__group">Legal</Link>
        <span className="crumbs__sep" aria-hidden="true">/</span>
        <span className="crumbs__current" aria-current="page">Privacy</span>
      </nav>

      <h1>Privacy Policy</h1>
      <p className="doc__lede">Neefoon is built around a simple principle: collect as little as possible. Here's exactly what happens to your data when you use the app.</p>

      <h2>1. What we do not collect</h2>
      <ul>
        <li>We do not require an account or sign-up.</li>
        <li>We do not run third-party advertising or analytics SDKs that track you across apps.</li>
        <li>We do not sell, share, or monetize your personal data. There is no such pipeline in the app.</li>
      </ul>

      <h2>2. What we use, and why</h2>
      <h3>Location</h3>
      <p>If you grant location permission, your device's coordinates are used <em>on-device</em> to center the map on your area and find nearby stations. The coordinates are not transmitted to our servers or stored externally.</p>

      <h3>Air quality data</h3>
      <p>The app fetches public AQI station data from third-party providers (such as Air4Thai and other open networks). These requests are anonymous and include only the geographic bounds you are viewing.</p>

      <h3>Crash diagnostics</h3>
      <p>If the app crashes, the operating system (iOS or Android) may send anonymized crash reports to us if you have opted in to system-level diagnostics. These contain no personal identifiers.</p>

      <h3>Local storage</h3>
      <p>Your language preference, theme choice, and recently viewed stations are stored only on your device. Uninstalling the app removes them.</p>

      <h2>3. Third-party services</h2>
      <p>Map tiles, AQI data, and font assets may be served by third-party providers. Their use is governed by their own privacy policies. We do not pass any user-identifying information to them.</p>

      <h2>4. Children</h2>
      <p>Neefoon is not directed at children under 13 and does not knowingly collect data from them.</p>

      <h2>5. Your rights</h2>
      <p>Because we don't collect personal data, there's nothing tied to you to access, correct, or delete. If you have questions, email <a href="mailto:support_neefoon@gmail.com" style={{color: "var(--teal-800)"}}>support_neefoon@gmail.com</a>.</p>

      <h2>6. Changes</h2>
      <p>If this policy changes, we'll update the date below and, for material changes, surface a notice in the app.</p>

      <div className="doc__updated">Last updated: 1 May 2026</div>





    </main>
  );
}

export default Privacy;