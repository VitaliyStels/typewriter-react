import React, { useEffect, useRef, useState } from 'react';
import './Typewriter.css';


const Typewriter: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return (
		<div ref={elementRef} className={isVisible ? 'typewriter' : ''}></div>
	);
}

export default Typewriter;