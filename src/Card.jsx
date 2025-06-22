import { useState, useEffect } from "react";

function Card({src, alt, style}) {
    const [{x, y}, setCardPosition] = useState({});

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const offsetX = (Math.random() - 0.5) * 0.2 * viewportWidth; // ±10% of width
        const offsetY = (Math.random() - 0.5) * 0.2 * viewportHeight; // ±10% of height
        setCardPosition({
            x: centerX + offsetX,
            y: centerY + offsetY
        });
        
    }, []);

    return (
        <div style={{
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                ...style,
            }}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default Card;