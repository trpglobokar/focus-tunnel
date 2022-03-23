import * as CSS from 'csstype';

export const focusTunnelInvisible: CSS.Properties = {
  display: 'none',
};

export const focusTunnelVisible: CSS.Properties = {
  background: 'radial-gradient(circle, rgba(159,203,169,1) 0%, rgba(82,121,111,1) 50%, rgba(47,62,70,1) 100%)',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff !important',
  textAlign: 'center',
  fontFamily: 'monospace !important',
};