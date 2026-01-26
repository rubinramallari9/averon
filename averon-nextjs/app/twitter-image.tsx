import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Averon Digital - Web Development Agency in Albania'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Fetch the logo
  const logoData = await fetch(
    new URL('../public/averon_logobg.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo Image */}
          <img
            src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
            width={600}
            height={180}
            style={{
              marginBottom: 40,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 36,
              color: '#e2e8f0',
              marginBottom: 40,
              display: 'flex',
            }}
          >
            Web Development Agency
          </div>

          {/* Services Pills */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Next.js', 'React', 'Django', 'E-commerce', 'SEO'].map((tech) => (
              <div
                key={tech}
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: 20,
                  padding: '10px 24px',
                  fontSize: 22,
                  color: '#c4b5fd',
                  display: 'flex',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 26,
              color: '#94a3b8',
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Tirana, Albania
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 24,
            color: '#64748b',
            display: 'flex',
          }}
        >
          averon.agency
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
            filter: 'blur(50px)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 60,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))',
            filter: 'blur(60px)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
