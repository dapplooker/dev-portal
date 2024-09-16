import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const subtitlePlugin = {
  id: 'subtitlePlugin',
  afterDraw(chart, args, options) {
    const { ctx, chartArea } = chart;
    const subtitle = options.plugins?.subtitle || {};

    if (!subtitle.display) return;

    const { text = '', color = '#000', font = { size: 12, weight: 'normal', family: 'Arial' }, padding = { top: 0 }, align = 'start' } = subtitle;

    ctx.save();
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;

    const titleWidth = ctx.measureText(text).width;
    const x = chartArea.left + (padding.left || 0);
    const y = chartArea.top + (chartArea.height / 2) + (padding.top || 0);

    ctx.fillText(text, x, y);

    ctx.restore();
  }
};

export default subtitlePlugin;
