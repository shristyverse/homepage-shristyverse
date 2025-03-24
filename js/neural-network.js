class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationFrameId = null;
        this.mousePosition = { x: 0, y: 0 };
        this.resizeCanvas();
        this.init();
        
        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mousePosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        });
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        if (this.nodes.length) this.init(); // Reinitialize if nodes exist
    }

    init() {
        // Create nodes
        this.nodes = [];
        const numberOfNodes = Math.floor((this.canvas.width * this.canvas.height) / 25000);
        
        for (let i = 0; i < numberOfNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                speed: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                }
            });
        }
    }

    drawNode(node, alpha = 1) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
    }

    drawConnection(nodeA, nodeB, distance, maxDistance) {
        const alpha = 1 - (distance / maxDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(nodeA.x, nodeA.y);
        this.ctx.lineTo(nodeB.x, nodeB.y);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }

    update() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw nodes
        const maxDistance = 150;

        this.nodes.forEach(node => {
            // Update position
            node.x += node.speed.x;
            node.y += node.speed.y;

            // Bounce off walls
            if (node.x < 0 || node.x > this.canvas.width) node.speed.x *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.speed.y *= -1;

            // Mouse interaction
            const mouseDistance = Math.hypot(this.mousePosition.x - node.x, this.mousePosition.y - node.y);
            if (mouseDistance < 100) {
                const angle = Math.atan2(this.mousePosition.y - node.y, this.mousePosition.x - node.x);
                node.x -= Math.cos(angle) * 0.5;
                node.y -= Math.sin(angle) * 0.5;
            }

            // Draw connections
            this.nodes.forEach(otherNode => {
                if (node === otherNode) return;
                const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                if (distance < maxDistance) {
                    this.drawConnection(node, otherNode, distance, maxDistance);
                }
            });

            // Draw node
            this.drawNode(node);
        });

        this.animationFrameId = requestAnimationFrame(() => this.update());
    }

    start() {
        if (!this.animationFrameId) {
            this.update();
        }
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

// Initialize the animation when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neural-network');
    if (canvas) {
        const network = new NeuralNetwork(canvas);
        network.start();
    }
});
