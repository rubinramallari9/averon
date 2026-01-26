import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Our Work - Averon Digital Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Fetch the logo
  const logoData = await fetch(
    new URL('../../public/averon_logobg.png', import.meta.url)
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
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
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
          {/* Logo Image - keeping square aspect ratio */}
          <img
            src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
            width={280}
            height={280}
            style={{
              marginBottom: 20,
              objectFit: 'contain',
            }}
          />

          {/* Page Title - moved down */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#ffffff',
              marginTop: 10,
              marginBottom: 15,
              display: 'flex',
            }}
          >
            Our Work
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              marginBottom: 30,
              display: 'flex',
              textAlign: 'center',
            }}
          >
            Showcasing our best web development projects
          </div>

          {/* Project Types */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['E-commerce', 'Corporate', 'Restaurants', 'Real Estate', 'Luxury'].map((type) => (
              <div
                key={type}
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: 20,
                  padding: '6px 16px',
                  fontSize: 16,
                  color: '#c4b5fd',
                  display: 'flex',
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 25,
            fontSize: 20,
            color: '#64748b',
            display: 'flex',
          }}
        >
          averon.agency/our-work
        </div>

        {/* Decorative Element - only on right side */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
            filter: 'blur(40px)',
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
