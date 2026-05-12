export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: "X",
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.835L2.25 2.25h6.968l4.259 5.63 4.767-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
          <polygon
            points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
            fill="#fff"
            stroke="none"
          />
        </svg>
      ),
    },
    {
      name: "TikTok",
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        .ft {
          background: #111;
          color: #fff;
          font-family: 'Syne', sans-serif;
          border-radius: 16px;
          overflow: hidden;
        }

        /* ── TOP GRID ── */
        .ft-top {
          display: grid;
          grid-template-columns: 1.4fr 1px 1fr 1px 1fr 1px 1fr;
          padding: 44px 40px 40px;
          gap: 0;
        }

        .ft-vdivider {
          background: #2a2a2a;
          width: 1px;
        }

        .ft-col {
          padding: 0 28px;
        }
        .ft-col:first-child { padding-left: 0; }
        .ft-col:last-child  { padding-right: 0; }

        /* Newsletter */
        .ft-label {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 20px;
        }

        .ft-email-row {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background: #1e1e1e;
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid #2a2a2a;
        }
        .ft-input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          padding: 11px 16px;
          flex: 1;
          min-width: 0;
          height: 50px
        }
        .ft-input::placeholder { color: #555; }
        .ft-btn {
          background: #B2F6E3;
          border: none;
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin: 2px;
          transition: background 0.4s;
        }
        .ft-btn:hover {
         background: #ffffff; 
         rotate: 60deg;
         tra
         }

        .ft-socials {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }
        .ft-social {
          width: 32px;
          height: 32px;
          border: 1px solid #2e2e2e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .ft-social:hover { border-color: #555; background: #1a1a1a; }

        /* Nav links */
        .ft-nav { display: flex; flex-direction: column; }
        .ft-nav a {
          color: #fff;
          text-decoration: none;
          font-size: 20px;
          font-weight: 700;
          padding: 7px 0;
          opacity: 0.9;
          transition: opacity 0.15s;
          letter-spacing: 0.005em;
          white-space: nowrap;
        }
        .ft-nav a:hover { opacity: 1; }

        /* Wordmark */
        .ft-wordmark-wrap {
          border-top: 1px solid #1e1e1e;
          overflow: hidden;
          line-height: 0.82;
          padding: 8px 40px 0;
        }
        .ft-wordmark {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.8rem, 14.5vw, 13rem);
          font-weight: 800;
          color: #fff;
          white-space: nowrap;
          letter-spacing: -0.035em;
          display: inline-flex;
          align-items: flex-start;
          padding: 80px 0;
        }
        .ft-reg {
          font-size: 0.22em;
          line-height: 1;
          margin-top: 0.18em;
          margin-left: 0.1em;
          font-weight: 700;
        }

        /* Bottom bar */
        .ft-bottom {
          padding: 16px 40px;
          border-top: 1px solid #1e1e1e;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ft-legal {
          font-size: 18px;
          color: white; 
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          row-gap: 4px;
        }
        .ft-legal span,
        .ft-legal a {
          font-size: 11px;
          color: #ffffff;
          text-decoration: none;
          white-space: nowrap;
        }
        .ft-legal a:hover { color: #888; }
        .ft-dot { color: #333 !important; }
        .ft-made { font-size: 11px; color: #444; white-space: nowrap; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .ft { border-radius: 12px; }

          .ft-top {
            grid-template-columns: 1fr;
            padding: 28px 24px 24px;
            gap: 0;
          }

          .ft-vdivider { display: none; }

          .ft-col {
            padding: 0;
            border-bottom: 1px solid #1e1e1e;
            padding-bottom: 28px;
            margin-bottom: 28px;
          }
          .ft-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
          }

          .ft-label { font-size: 18px; }

          .ft-nav a { font-size: 15px; padding: 6px 0; }

          .ft-nav-mobile-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 16px;
          }

          .ft-wordmark-wrap { padding: 8px 24px 0; }

          .ft-wordmark { font-size: clamp(3rem, 16vw, 6rem); }

          .ft-bottom {
            padding: 14px 24px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .ft-legal { gap: 6px; }
          .ft-legal span,
          .ft-legal a { font-size: 10px; }
          .ft-made { font-size: 10px; }
        }

        @media (max-width: 480px) {
          .ft-top { padding: 24px 20px 20px; }
          .ft-wordmark-wrap { padding: 6px 20px 0; }
          .ft-bottom { padding: 12px 20px; }
        }
      `}</style>

      <footer className="ft m-3 overflow-hidden">
        {/* ── TOP GRID ── */}
        <div className="ft-top">
          {/* Col 1 — Newsletter */}
          <div className="ft-col">
            <p className="ft-label">Stay updated with Rise news</p>
            <div className="ft-email-row">
              <input
                className="ft-input"
                type="email"
                placeholder="Your Email Address"
              />
              <button className="ft-btn" aria-label="Subscribe">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
            <div className="ft-socials">
              {socials.map((s) => (
                <div
                  className="ft-social"
                  key={s.name}
                  title={s.name}
                  role="link"
                  tabIndex={0}
                  aria-label={s.name}
                >
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="ft-vdivider" />

          {/* Col 2 */}
          <div className="ft-col">
            <nav className="ft-nav">
              {["Services", "Work", "About", "Culture", "Meet The Risers"].map(
                (l) => (
                  <a href="#" key={l}>
                    {l} ↗
                  </a>
                ),
              )}
            </nav>
          </div>

          <div className="ft-vdivider" />

          {/* Col 3 */}
          <div className="ft-col">
            <nav className="ft-nav">
              {["Testimonials", "Blog & Resources", "Webinars", "Careers"].map(
                (l) => (
                  <a href="#" key={l}>
                    {l} ↗
                  </a>
                ),
              )}
            </nav>
          </div>

          <div className="ft-vdivider" />

          {/* Col 4 */}
          <div className="ft-col">
            <nav className="ft-nav">
              {["Sheffield", "Manchester", "London", "New York", "Contact"].map(
                (l) => (
                  <a href="#" key={l}>
                    {l} ↗
                  </a>
                ),
              )}
            </nav>
          </div>
        </div>

        {/* ── WORDMARK ── */}
        <div className="ft-wordmark-wrap">
          <div className="ft-wordmark">
            Rise at Seven<span className="ft-reg">®</span>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <div className="ft-legal">
            <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
            <span className="ft-dot">•</span>
            <a href="#">Company Number 11955187</a>
            <span className="ft-dot">•</span>
            <a href="#">VAT Registered GB 322402945</a>
            <span className="ft-dot">•</span>
            <a href="#">Privacy Policy</a>
            <span className="ft-dot">•</span>
            <a href="#">Terms & conditions</a>
          </div>
          <div className="ft-made">Website MadeByShape</div>
        </div>
      </footer>
    </>
  );
}
