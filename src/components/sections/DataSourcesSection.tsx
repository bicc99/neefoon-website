import imgAir4thai    from '../../assets/images/air4thai.avif';
import imgAirGradient from '../../assets/images/airgradient.avif';
import imgCUsense     from '../../assets/images/CUsense.avif';
import imgFirms       from '../../assets/images/FIRMS.avif';

interface DataSource { src: string; alt: string; }

const DATA_SOURCES: DataSource[] = [
  { src: imgAir4thai,    alt: 'Air4Thai' },
  { src: imgAirGradient, alt: 'AirGradient' },
  { src: imgCUsense,     alt: 'CUsense' },
  { src: imgFirms,       alt: 'NASA FIRMS' },
];

function DataSourcesSection() {

  return (
    <section className="dataSources reveal" data-reveal aria-labelledby="dataSourcesLabel">
      <div className="dataSources__inner">
        <div className="dataSources__label" id="dataSourcesLabel">Powered by</div>
        <div className="dataSources__marquee">
          <div className="dataSources__track">
            {/* Three copies needed for the CSS marquee loop. Only the first carries
                real alt text; the duplicates are decorative. */}
            {Array.from({ length: 3 }, (_, groupIdx) => (
              <ul key={groupIdx} className="dataSources__group" aria-hidden={groupIdx > 0 ? true : undefined}>
                {DATA_SOURCES.map((s) => (
                  <li key={s.alt} className="dataSources__logo">
                    <img src={s.src} alt={groupIdx === 0 ? s.alt : ''} loading="lazy" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataSourcesSection;
