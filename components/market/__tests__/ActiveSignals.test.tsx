import { getSignalColor } from '../ActiveSignals';

describe('getSignalColor', () => {
  it('returns green classes for strong_buy', () => {
    expect(getSignalColor('strong_buy')).toBe('bg-green-500/20 text-green-400 border-green-500/30');
  });

  it('returns light green classes for buy', () => {
    expect(getSignalColor('buy')).toBe('bg-green-500/10 text-green-400 border-green-500/20');
  });

  it('returns red classes for strong_sell', () => {
    expect(getSignalColor('strong_sell')).toBe('bg-red-500/20 text-red-400 border-red-500/30');
  });

  it('returns light red classes for sell', () => {
    expect(getSignalColor('sell')).toBe('bg-red-500/10 text-red-400 border-red-500/20');
  });

  it('returns slate classes for others', () => {
    expect(getSignalColor('hold')).toBe('bg-slate-500/10 text-slate-400 border-slate-500/20');
  });
});
