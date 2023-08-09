
// AnimatedElement.tsx
import React, { useEffect, useRef, useState } from 'react';
import './AnimatedElement.css';

interface AnimatedElementProps {
	children: React.ReactNode;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const options = {
			threshold: 0.25, // Adjust the threshold as needed (0.25 means 25% of the element visible triggers the animation)
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		}, options);

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
		<div ref={elementRef} className={isVisible ? 'fade-in' : ''}>
			{children}
		</div>
	);
};

export default AnimatedElement;
