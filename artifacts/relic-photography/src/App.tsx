import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Plus, X } from 'lucide-react';

const WA = 'https://wa.me/918668182344';
const PHONE = 'tel:+918668182344';
const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Park+Rd%2C+Erode%2C+First+Floor%2C+SNS+Corner%2C+91%2C+Tamil+Nadu+638003';

const navigation = [
  ['About', '#about'], ['Services', '#services'], ['Portfolio', '#portfolio'],
  ['Packages', '#packages'], ['FAQ', '#faq'], ['Contact', '#contact'],
];
const imageAssets = [
  { src: '/images/ritual-study.jpg', alt: 'Generated editorial study of jasmine, silk and ceremonial details', title: 'Weddings & Traditional', type: 'PLACEHOLDER STUDY — NOT RELIC PORTFOLIO' },
  { src: '/images/corridor-study.jpg', alt: 'Generated editorial study of a ceremonial corridor at dusk', title: 'Candid Moments', type: 'PLACEHOLDER STUDY — NOT RELIC PORTFOLIO' },
  { src: '/images/garland-study.jpg', alt: 'Generated editorial study of a flower garland exchange, faces out of frame', title: 'Pre-Wedding & Outdoor', type: 'PLACEHOLDER STUDY — NOT RELIC PORTFOLIO' },
  { src: '/images/ritual-study.jpg', alt: 'Generated editorial study of wedding jasmine and silk details', title: 'Maternity & Portraits', type: 'PLACEHOLDER STUDY — NOT RELIC PORTFOLIO' },
];
const faqItems = [
  ['What photography services does Relic Photography provide?', 'We provide wedding, candid, cinematic, engagement, pre-wedding, couple, family and event photography services.'],
  ['Where is Relic Photography located?', 'Relic Photography is located at Park Rd, Erode, First Floor, SNS Corner, 91, Tamil Nadu 638003.'],
  ['Do you cover traditional weddings?', 'Yes. Our wedding photography coverage includes traditional rituals and celebrations.'],
  ['Do you provide cinematic wedding videos?', 'Yes, cinematic wedding videography is one of our services.'],
  ['Do you provide pre-wedding photography?', 'Yes, we offer engagement and pre-wedding photography sessions.'],
  ['Which locations do you cover?', 'We serve Erode and surrounding areas including Perundurai, Bhavani, Chithode, Modakurichi, Avalpoondurai, Kavundapadi, Gobichettipalayam and Pallipalayam.'],
  ['How can I enquire about a package?', 'You can contact Relic Photography by phone or through WhatsApp.'],
];
const steps = [
  ['01', 'ENQUIRE', 'Tell us about your wedding or event.'],
  ['02', 'PLAN', 'Discuss your requirements, dates and photography coverage.'],
  ['03', 'CAPTURE', 'Our team captures the important moments, emotions and details.'],
  ['04', 'CREATE', 'Your photographs and videos are professionally processed.'],
  ['05', 'CHERISH', 'Relive your special moments through your final photographs, films and albums.'],
];
const why = [
  ['01', 'LOCAL EXPERTISE', 'Deeply familiar with Indian wedding rituals and cultural nuances in Tamil Nadu.'],
  ['02', 'FLEXIBLE BUDGETS', 'Premium results with transparent options for couples looking for affordable wedding photography in Erode.'],
  ['03', 'STATE-OF-THE-ART GEAR', 'High-resolution delivery, professional lighting setup, and premium physical albums.'],
  ['04', 'A WARM APPROACH', 'A friendly, respectful photography team that keeps you feeling relaxed and natural in front of the camera.'],
];
const packageNames = ['WEDDING', 'BUDGET WEDDING PACKAGES', 'ENGAGEMENT', 'PUBERTY', 'BIRTHDAY'];
const serviceNames = ['REAL ESTATE VIDEOGRAPHY', 'PHOTO FRAMES', 'VISITING CARD DESIGN', 'COPY CD & DVD', 'ALBUM PRINTING'];
const places = ['Erode City', 'Perundurai', 'Bhavani', 'Chithode', 'Modakurichi', 'Avalpoondurai', 'Kavundapadi', 'Gobichettipalayam', 'Pallipalayam'];
const reviews = ['Client testimonial will be displayed here.', 'Real client feedback will be added here.', 'Add verified client review here.'];

function PlaceholderPhoto({ src, alt, label = 'IMAGE PLACEHOLDER · REPLACE WITH RELIC PHOTOGRAPHY' }: { src: string; alt: string; label?: string }) {
  return <div className="photo-frame"><img src={src} alt={alt} loading="lazy" width="1000" height="1200" /><span className="placeholder-label">{label}</span></div>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [review, setReview] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    document.body.classList.add('reveal-pending');
    const sections = document.querySelectorAll<HTMLElement>('main > .section .wrap, main > .final-cta .wrap');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.body.classList.remove('reveal-pending');
    };
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') setLightbox((current) => current === null ? null : (current + 1) % imageAssets.length);
      if (event.key === 'ArrowLeft') setLightbox((current) => current === null ? null : (current + imageAssets.length - 1) % imageAssets.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      'Hello Relic Photography, I would like to enquire.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Event type: ${data.get('eventType')}`,
      `Event date: ${data.get('eventDate') || 'Not decided'}`,
      `Location: ${data.get('location')}`,
      `Message: ${data.get('message') || '—'}`,
    ].join('\n');
    setFormStatus('Your enquiry is ready in WhatsApp. Please review and send it there.');
    window.open(`${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header>
        <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
          <div className="nav-inner">
            <a className="brand" href="#home" aria-label="Relic Photography home" data-testid="link-brand">RELIC<small>PHOTOGRAPHY · ERODE</small></a>
            <div className="nav-links">
              {navigation.map(([name, href]) => <a key={name} href={href} data-testid={`link-nav-${name.toLowerCase()}`}>{name}</a>)}
            </div>
            <a className="nav-talk" href="#contact" data-testid="link-nav-talk">LET'S TALK</a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={21} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
          <a href="#home" onClick={() => setMenuOpen(false)} data-testid="link-mobile-home">HOME</a>
          <a href="#packages" onClick={() => setMenuOpen(false)} data-testid="link-mobile-packages">PACKAGES</a>
          {packageNames.map((item, index) => <a className="mobile-sub" key={item} href="#packages" onClick={() => setMenuOpen(false)} data-testid={`link-mobile-package-${index}`}>{item}</a>)}
          <a href="#services" onClick={() => setMenuOpen(false)} data-testid="link-mobile-services">SERVICES</a>
          {['EVENTS', 'REAL ESTATE VIDEOGRAPHY', 'PHOTO FRAMES', 'VISITING CARD DESIGN', 'COPY CD & DVD'].map((item, index) => <a className="mobile-sub" key={item} href="#services" onClick={() => setMenuOpen(false)} data-testid={`link-mobile-service-${index}`}>{item}</a>)}
          <a href="#services" onClick={() => setMenuOpen(false)} data-testid="link-mobile-album">ALBUM PRINTING</a>
          <a href="#about" onClick={() => setMenuOpen(false)} data-testid="link-mobile-about">ABOUT US</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} data-testid="link-mobile-faq">FAQ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-mobile-contact">CONTACT US</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="hero-art"><img src="/images/corridor-study.jpg" alt="" fetchPriority="high" /></div>
          <div className="hero-shade" />
          <span className="placeholder-label">IMAGE PLACEHOLDER · REPLACE WITH RELIC PHOTOGRAPHY</span>
          <div className="hero-content">
            <div className="eyebrow hero-meta">RELIC PHOTOGRAPHY · ERODE</div>
            <h1 id="hero-heading">Every Love Story <em>Deserves to Be Remembered.</em></h1>
            <p className="eyebrow hero-meta">Wedding Photography &amp; Cinematic Storytelling in Erode.</p>
            <p className="hero-copy">From intimate rituals to unforgettable celebrations, we preserve the emotions, traditions and moments that make your story uniquely yours.</p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#portfolio" data-testid="link-explore-stories">EXPLORE OUR STORIES <ArrowDown size={13} /></a>
              <a className="btn btn-gold" href="#contact" data-testid="link-book-date">BOOK YOUR DATE <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className="scroll-cue">SCROLL TO EXPLORE</div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <div className="about-image"><PlaceholderPhoto src="/images/ritual-study.jpg" alt="Generated editorial study of jasmine and wedding ritual details" /></div>
            <div className="about-copy">
              <div className="eyebrow">OUR STORY</div>
              <h2 className="section-title" id="about-title">We Capture Stories, <em>Not Just Pictures.</em></h2>
              <span className="gold-rule" />
              <p>Your wedding day is a collection of once-in-a-lifetime moments—the shared laughter, the quiet glances, and the vibrant traditions. At Relic Photography, one of the premier photo studios in Erode, we specialize in turning those fleeting emotions into timeless visual stories.</p>
              <p>From deep-rooted traditional rituals to spontaneous candid highlights, our team captures the genuine essence of your celebration with artistic precision and care.</p>
              <p>Based in Erode, Tamil Nadu, Relic Photography provides professional photography and videography services for weddings, engagements, pre-wedding sessions, family celebrations and special events.</p>
              <a className="text-link" href="#services" data-testid="link-discover">DISCOVER RELIC PHOTOGRAPHY <ArrowRight size={13} /></a>
            </div>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="wrap">
            <div className="services-head">
              <div><div className="eyebrow">WHAT WE DO</div><h2 className="section-title" id="services-title">Photography for Every Chapter <em>of Your Story.</em></h2></div>
              <p className="section-intro">A considered eye for the quiet in-between and the traditions that bring everyone together.</p>
            </div>
            <div className="services-grid">
              {[
                ['01', 'WEDDING & CINEMATIC VIDEOGRAPHY', 'A seamless blend of candid frames, traditional coverage, and cinematic storytelling that documents your entire wedding day timeline.', '/images/corridor-study.jpg'],
                ['02', 'ENGAGEMENT & PRE-WEDDING SHOOTS', 'Creative, expressive portrait sessions that celebrate your unique chemistry before you say “I do.”', '/images/garland-study.jpg'],
                ['03', 'OUTDOOR & COUPLE PORTRAITS', 'Artistic maternity, newborn, family, and lifestyle portrait sessions set against beautiful natural backdrops.', '/images/ritual-study.jpg'],
                ['04', 'EVENT & CELEBRATION PHOTOGRAPHY', 'Professional coverage for family milestones, including puberty ceremonies, birthday parties, and corporate events.', '/images/corridor-study.jpg'],
              ].map(([num, title, description, src]) => (
                <article className="service" key={num} data-testid={`card-service-${num}`}>
                  <div className="service-image"><PlaceholderPhoto src={src} alt={`Generated editorial placeholder for ${title.toLowerCase()}`} label="IMAGE PLACEHOLDER" /></div>
                  <div><span className="service-num">{num}</span><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
            <div className="service-extras" aria-label="Additional services">{serviceNames.map((service) => <span key={service}>{service}</span>)}</div>
          </div>
        </section>

        <section className="story-band" aria-labelledby="story-title">
          <div className="photo-frame"><img src="/images/garland-study.jpg" alt="" loading="lazy" /><span className="placeholder-label">IMAGE PLACEHOLDER · NOT RELIC PORTFOLIO</span></div>
          <div className="story-overlay" />
          <div className="wrap"><div className="story-content">
            <div className="eyebrow">A LOVE STORY</div>
            <h2 className="section-title" id="story-title">Moments That <em>Stay With You.</em></h2>
            <span className="gold-rule" />
            <p>Every celebration has its own rhythm, emotions and memories. From the first ritual to the final celebration, we document the moments that make your wedding truly yours.</p>
            <a href="#portfolio" className="text-link" data-testid="link-view-stories">VIEW OUR STORIES <ArrowRight size={13} /></a>
          </div></div>
        </section>

        <section className="section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="wrap">
            <div className="portfolio-intro">
              <div><div className="eyebrow">OUR PORTFOLIO</div><h2 className="section-title" id="portfolio-title">Every Frame <em>Tells a Story.</em></h2></div>
              <p className="section-intro">Every love story looks different. Explore our latest galleries to see how we blend clean tones, natural lighting, and emotional depth.</p>
            </div>
            <p className="portfolio-disclaimer">The images below are generated visual placeholders only—not Relic Photography's work. Replace with verified studio photographs.</p>
            <div className="gallery">
              {imageAssets.map((item, index) => <button className="gallery-item" key={item.title} onClick={() => setLightbox(index)} aria-label={`Open placeholder image: ${item.title}`} data-testid={`button-gallery-${index}`}>
                <img src={item.src} alt={item.alt} loading="lazy" width="900" height="1000" />
                <span className="placeholder-label">{item.type}</span>
                <span className="gallery-caption"><b>{item.title}</b><span>Editorial image placeholder</span></span>
              </button>)}
            </div>
            <div className="category-row">
              {[
                ['WEDDINGS & TRADITIONAL', 'Documenting the vibrant heritage of Indian weddings.'],
                ['CANDID MOMENTS', 'Catching the raw, unscripted emotions of the day.'],
                ['PRE-WEDDING & OUTDOOR', 'Stylish, relaxed portraits of couples in love.'],
                ['MATERNITY & PORTRAITS', 'Celebrating family milestones and new beginnings.'],
              ].map(([title, copy]) => <div className="category" key={title}><h3>{title}</h3><p>{copy}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section why-section" aria-labelledby="why-title">
          <div className="wrap">
            <div className="why-head">
              <div><div className="eyebrow">WHY RELIC</div><h2 className="section-title" id="why-title">More Than Photography. <em>A Memory-Making Experience.</em></h2></div>
              <p className="section-intro">The best photographs begin with feeling at ease. Thoughtful coverage, a warm approach, and an understanding of the traditions that matter to you.</p>
            </div>
            <div className="why-grid">{why.map(([num, title, copy]) => <article className="why-item" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="section" id="packages" aria-labelledby="packages-title">
          <div className="wrap packages">
            <div className="packages-copy">
              <div className="eyebrow">PACKAGES</div>
              <h2 className="section-title" id="packages-title">Designed Around <em>Your Celebration.</em></h2>
              <span className="gold-rule" />
              <p>We believe that world-class memories shouldn’t come with an unreachable price tag. If you are searching for wedding photography packages in Erode, we offer value-driven, customizable options designed to fit various budgets.</p>
              <p>Our goal is to provide exceptional, professional coverage without compromising on quality. Whether you are planning an intimate temple wedding or a grand celebration, we ensure every meaningful chapter of your day is preserved beautifully.</p>
              <p>Package details are shared directly so your coverage can be discussed around your celebration.</p>
              <a href="#contact" className="btn btn-dark" data-testid="link-custom-package">GET A CUSTOM PACKAGE <ArrowUpRight size={13} /></a>
            </div>
            <div className="package-list">
              {packageNames.map((item, index) => <div className="package-row" key={item}>
                <span className="num">0{index + 1}</span><h3>{item}</h3>
                <a href="#contact" data-testid={`link-package-${index}`}>ENQUIRE FOR DETAILS <ArrowUpRight size={12} /></a>
              </div>)}
            </div>
          </div>
        </section>

        <section className="section process" aria-labelledby="process-title">
          <div className="wrap">
            <div className="process-head"><div><div className="eyebrow">THE EXPERIENCE</div><h2 className="section-title" id="process-title">From Your First Call <em>to Your Final Album.</em></h2></div>
              <p className="section-intro">A thoughtful process, from the first conversation to the photographs and films you will return to.</p></div>
            <div className="process-list">{steps.map(([num, title, copy]) => <article className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="section testimonials" aria-labelledby="testimonial-title">
          <div className="wrap">
            <div className="eyebrow">CLIENT STORIES</div>
            <h2 className="section-title" id="testimonial-title">Loved by Our Clients.</h2>
            <p className="testimonial-note">Review placeholder — real, verified client feedback will be added here.</p>
            <div className="quote-mark" aria-hidden="true">“</div>
            <blockquote className="quote-placeholder" data-testid="text-review-placeholder">{reviews[review]}</blockquote>
            <div className="testimonial-note">— CLIENT NAME · WEDDING</div>
            <div className="carousel-controls">
              <button aria-label="Previous testimonial placeholder" onClick={() => setReview((review + reviews.length - 1) % reviews.length)} data-testid="button-review-previous"><ArrowLeft size={15} /></button>
              <button aria-label="Next testimonial placeholder" onClick={() => setReview((review + 1) % reviews.length)} data-testid="button-review-next"><ArrowRight size={15} /></button>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="areas-title">
          <div className="wrap areas">
            <div>
              <div className="eyebrow">WHERE WE WORK</div>
              <h2 className="section-title" id="areas-title">Serving Erode &amp; <em>Surrounding Areas.</em></h2>
              <span className="gold-rule" />
              <p className="section-intro">While we love traveling for destination weddings, we proudly offer full wedding and event photography services across the Erode district and surrounding regions.</p>
              <div className="area-list">{places.map((place) => <span key={place} data-testid={`text-area-${place.toLowerCase().replaceAll(' ', '-')}`}>{place}</span>)}</div>
              <p className="eyebrow">Destination weddings and events are welcome.</p>
            </div>
            <div className="areas-art" aria-label="Abstract decorative map-inspired artwork for Erode"><strong>ERODE<br /><i>Tamil Nadu</i></strong><span className="placeholder-label">DECORATIVE AREA STUDY</span></div>
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-layout">
            <div><div className="eyebrow">FAQ</div><h2 className="section-title" id="faq-title">Frequently Asked <em>Questions.</em></h2><p className="section-intro">A few helpful answers as you begin planning.</p></div>
            <div className="faq-list">
              {faqItems.map(([question, answer], index) => <div className="faq-item" key={question}>
                <button className="faq-question" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`button-faq-${index}`}>
                  {question}<Plus size={16} />
                </button>
                {openFaq === index && <div className="faq-answer" id={`faq-answer-${index}`} data-testid={`text-faq-answer-${index}`}>{answer}</div>}
              </div>)}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="contact-head"><div className="eyebrow">LET'S TALK</div><h2 className="section-title" id="contact-title">Let's Create <em>Something Timeless.</em></h2>
              <p className="section-intro">Planning your wedding or special celebration? Talk to us about your photography and videography requirements.</p></div>
            <div className="contact-grid">
              <div className="contact-details">
                <h3>RELIC PHOTOGRAPHY</h3>
                <address>Park Rd, Erode, First Floor,<br />SNS Corner, 91,<br />Tamil Nadu 638003.</address>
                <div className="contact-row"><div className="eyebrow">PHONE</div><a href={PHONE} data-testid="link-phone">86681 82344</a></div>
                <div className="contact-row"><div className="eyebrow">WHATSAPP</div><a href={WA} target="_blank" rel="noopener noreferrer" data-testid="link-whatsapp-number">+91 86681 82344</a></div>
                <div className="contact-actions">
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-gold" data-testid="link-contact-whatsapp">WHATSAPP US <ArrowUpRight size={13} /></a>
                  <a href={PHONE} className="btn btn-light" data-testid="link-call-now">CALL NOW</a>
                  <a href="#enquiry-form" className="btn btn-light" data-testid="link-get-quote">GET A QUOTE</a>
                  <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn-light" data-testid="link-directions">GET DIRECTIONS <ArrowUpRight size={13} /></a>
                </div>
              </div>
              <form className="contact-form" id="enquiry-form" onSubmit={submitEnquiry} data-testid="form-enquiry">
                <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" autoComplete="name" required minLength={2} placeholder="Your name" data-testid="input-name" /></div>
                <div className="field"><label htmlFor="phone">Phone Number *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required pattern="(?=.*[0-9])[+0-9 ()-]{8,18}" title="Enter a valid phone number" placeholder="Your number" data-testid="input-phone" /></div>
                <div className="field"><label htmlFor="eventType">Event Type *</label><select id="eventType" name="eventType" required defaultValue="" data-testid="select-event-type"><option value="" disabled>Select event type</option>{['Wedding', 'Budget Wedding Packages', 'Engagement', 'Puberty', 'Birthday', 'Other event'].map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
                <div className="field"><label htmlFor="eventDate">Event Date</label><input id="eventDate" name="eventDate" type="date" data-testid="input-event-date" /></div>
                <div className="field wide"><label htmlFor="location">Location *</label><input id="location" name="location" required placeholder="Event location" data-testid="input-location" /></div>
                <div className="field wide"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="Tell us a little about what you're planning" data-testid="input-message" /></div>
                <p className="form-note">Submitting prepares your enquiry in WhatsApp. No email is sent; please review the message and press send in WhatsApp.</p>
                <div className="form-status" aria-live="polite" data-testid="status-form">{formStatus}</div>
                <button className="btn btn-gold" type="submit" data-testid="button-submit-enquiry">SEND ENQUIRY <ArrowUpRight size={13} /></button>
              </form>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="wrap">
            <div className="eyebrow">THE BEGINNING OF YOUR STORY</div>
            <h2 className="section-title" id="final-title">Your Moments. Your Story. <em>Our Frames.</em></h2>
            <p>Let Relic Photography turn your most important moments into memories you can relive forever.</p>
            <div className="final-actions">
              <a className="btn btn-dark" href="#contact" data-testid="link-enquire-now">ENQUIRE NOW <ArrowUpRight size={13} /></a>
              <a className="btn btn-gold" href={WA} target="_blank" rel="noopener noreferrer" data-testid="link-final-whatsapp">WHATSAPP US <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand-block"><a className="brand" href="#home">RELIC<small>PHOTOGRAPHY</small></a><p>Wedding Photography &amp; Cinematic Storytelling in Erode.</p></div>
            <div><h3>QUICK LINKS</h3><div className="footer-links">{[['Home','#home'],['About','#about'],['Services','#services'],['Portfolio','#portfolio'],['Packages','#packages'],['FAQ','#faq'],['Contact','#contact']].map(([name, href], index) => <a key={name} href={href} data-testid={`link-footer-nav-${index}`}>{name}</a>)}</div></div>
            <div><h3>SERVICES</h3><div className="footer-links">{['Wedding Photography','Candid Photography','Cinematic Videography','Pre-Wedding','Engagement','Events'].map((name, index) => <a key={name} href="#services" data-testid={`link-footer-service-${index}`}>{name}</a>)}</div></div>
            <div><h3>CONTACT</h3><div className="footer-links"><a href={PHONE}>86681 82344</a><span>Erode, Tamil Nadu</span><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a><span>Instagram · link to be provided</span><span>Facebook · link to be provided</span></div></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Relic Photography. All rights reserved.</span><span>Park Rd, Erode, Tamil Nadu 638003</span></div>
        </div>
      </footer>

      <a href={WA} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat with Relic Photography on WhatsApp" data-testid="link-floating-whatsapp">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-4.8A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.5 8.5c.4 2.8 2.1 4.5 5 5" /></svg>
        <span>Chat with us</span>
      </a>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio placeholder viewer" onClick={() => setLightbox(null)} data-testid="dialog-lightbox">
        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image viewer" data-testid="button-close-lightbox"><X size={20} /></button>
        <button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + imageAssets.length - 1) % imageAssets.length); }} aria-label="Previous image" data-testid="button-lightbox-previous"><ArrowLeft size={17} /></button>
        <img src={imageAssets[lightbox].src} alt={imageAssets[lightbox].alt} onClick={(event) => event.stopPropagation()} />
        <button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % imageAssets.length); }} aria-label="Next image" data-testid="button-lightbox-next"><ArrowRight size={17} /></button>
        <div className="lightbox-caption">{imageAssets[lightbox].type} · {imageAssets[lightbox].title}</div>
      </div>}
    </>
  );
}

export default App;