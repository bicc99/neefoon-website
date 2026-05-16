import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

function Terms() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>Terms of Service - Neefoon</title>
        <meta name="description" content="Terms of service for Neefoon, the free real-time AQI and air quality app for Thailand, Southeast Asia, and worldwide." />
      </Helmet>
      <main className="doc reveal" data-reveal>
    {/* ---------- Breadcrumb ---------- */}
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to={"/"}>Home</Link>
      <span className="crumbs__sep" aria-hidden="true">/</span>
      <Link to={"#"} className="crumbs__group">Legal</Link>
      <span className="crumbs__sep" aria-hidden="true">/</span>
      <span className="crumbs__current" aria-current="page">Terms</span>
    </nav>

    <h1>Terms of Use</h1>
    <p className="doc__lede">By installing and using Neefoon, you agree to these terms. They are short on purpose.</p>

    <h2>1. The service</h2>
    <p>Neefoon is a free mobile application that displays air quality data aggregated from public providers. The app is offered as-is, without warranty of any kind.</p>

    <h2>2. Air quality data is informational</h2>
    <p>AQI readings, hotspot data, and pollutant values are sourced from third-party networks. Readings may be delayed, incomplete, or inaccurate due to sensor calibration, provider outages, or local conditions. Neefoon should <strong>not</strong> be relied on for medical, emergency, or safety-critical decisions. When in doubt, consult official government advisories and qualified professionals.</p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>You agree not to reverse-engineer, scrape, or republish bulk data from the app.</li>
        <li>You agree not to use the app to harass, defame, or violate the rights of others.</li>
        <li>You agree to use the app in compliance with all applicable laws.</li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>The Neefoon name, logo, and original UI design are the property of the developer. Source data is owned by its respective providers and surfaced under their public terms.</p>

      <h2>5. Donations</h2>
      <p>Coffee tips and other voluntary contributions are non-refundable gifts and do not entitle you to additional features, support priority, or any commercial relationship.</p>
      
      <h2>6. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the app.</p>

      <h2>7. Changes</h2>
      <p>We may update these terms from time to time. Continued use of the app after changes constitutes acceptance of the revised terms.</p>

      <h2>8. Contact</h2>
      <p>Questions about these terms: <a href="mailto:support.neefoon@gmail.com" style={{color: "var(--teal-800)"}}>support.neefoon@gmail.com</a>.</p>

      <div className="doc__updated">Last updated: 1 May 2026</div>
  </main>
    </>
  );
}

export default Terms;