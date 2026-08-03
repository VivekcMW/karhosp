import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Karwar Eye Hospital - World-class Eye Care in Karwar, Karnataka';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f766e',
          backgroundImage: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #0a4a45 100%)',
        }}
      >
        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Hospital Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: 20,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Karwar Eye Hospital
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 36,
              color: '#ccfbf1',
              marginBottom: 40,
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            World-class Eye Care in Karwar, Karnataka
          </div>

          {/* Specialties */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            {['Cataract', 'LASIK', 'Glaucoma', 'Retina', 'Pediatric'].map((specialty) => (
              <div
                key={specialty}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontSize: 24,
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {specialty}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div
            style={{
              marginTop: 60,
              display: 'flex',
              gap: 40,
              color: '#e0f2f1',
              fontSize: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              📞 +91 90197 25332
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              📍 Karwar, Karnataka
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
