import { Processor } from '../../src/lib';

const processor = new Processor();

describe('Attributify Mode', () => {
  it('simple attributify', () => {
    expect(processor.attributify({
      font: 'bold',
      p: ['x-4', 'y-2', 'lg:4'],
      bg: ['green-400', 'opacity-50'],
    }).styleSheet.build()).toMatchSnapshot('css');
  });

  it('with variants', () => {
    expect(processor.attributify({
      sm: ['bg-red-500', 'bg-opacity-50'],
      'sm:hover': ['text-red-500', 'text-lg'],
      'sm-hover': ['text-red-500', 'text-lg'],
    }).styleSheet.build()).toMatchSnapshot('css');
  });

  it('mix utility and variant', () => {
    expect(processor.attributify({
      p: ['x-4', 'y-2', 'md:x-2', 'lg:hover:x-8'],
      sm: ['bg-red-500', 'bg-opacity-50', 'hover:bg-green-300'],
      'sm:hover': ['text-red-500', 'text-lg', 'focus:bg-white'],
    }).styleSheet.build()).toMatchSnapshot('css');
  });

  it('with variants and utility', () => {
    expect(processor.attributify({
      'sm:p': ['x-4', 'y-2'],
      'hover-text': ['red-300', 'sm'],
      'hover:text': ['red-500', 'lg'],
      'sm:hover:text': ['red-500', 'lg'],
      'sm-hover-text': ['red-300', 'sm'],
    }).styleSheet.build()).toMatchSnapshot('css');
  });

  it('with negative utility', () => {
    expect(processor.attributify({
      'm': ['-x-4', 'md:y-2'],
      'sm': ['-my-2'],
    }).styleSheet.build()).toMatchSnapshot('css');
  });

  it('with grid utility', () => {
    const result = processor.attributify({
      'grid': [
        'default', 'inline', // display
        'cols-1', 'cols-none', // grid-template-columns
        'col-auto', 'col-span-2', // grid-column
        'rows-3', 'rows-none', // grid-template-rows
        'row-auto', 'row-span-2', // grid-rows
        'flow-row', 'flow-col', 'flow-row-dense', // grid-auto-flow
        'auto-cols-auto', 'auto-cols-min', 'auto-cols-max', // grid-auto-columns
        'auto-rows-auto', 'auto-rows-min', 'auto-rows-max', // grid-auto-rows
        'gap-2', 'gap-x-4', 'gap-y-2', // gap/column-gap/row-gap
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with gradient utility', () => {
    const result = processor.attributify({
      'gradient': [
        'none', 'to-r', 'to-br',
        'from-yellow-400',
        'via-red-500',
        'to-pink-500',
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with display utility', () => {
    const result = processor.attributify({
      'display': [
        'visible', 'invisible', // visibility
        'inline', 'flow-root', 'contents', 'list-item', 'hidden', 'block', 'inline-block', // display
        'md:hidden',
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with position utility', () => {
    const result = processor.attributify({
      'position': [
        'static', 'fixed', 'absolute', 'relative', 'sticky', // position
        'inset-1', '-inset-1', 'inset-x-1', '-inset-y-2', // inset
        'top-1.5', '-left-3/4', // top/left/bottom/right
        'float-right', 'float-left', 'float-none', // float
        'clear-left', 'clear-right', 'clear-both', 'clear-none', // clear
        'order-1', 'order-first', // order
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with box utility', () => {
    const result = processor.attributify({
      'box': [
        'decoration-slice', 'decoration-clone', // box-decoration-break
        'border', 'content',  // box-sizing
        'shadow', 'shadow-gray-200', // box-shadow
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with isolation utility', () => {
    const result = processor.attributify({
      'isolation': [
        'isolate', 'auto', // isolation
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with z-index width min-width max-width height min-height max-height opacity', () => {
    const result = processor.attributify({
      'w': [ '0', '1', 'full', 'screen', 'md:screen' ],
      'min-w': [ '0', '1', 'full', 'screen', 'md:screen' ],
      'max-w': [ '0', '1', 'full', 'screen', 'md:screen' ],
      'h': [ 'full', 'screen', 'md:screen' ],
      'min-h': [ 'full', 'screen', 'md:screen' ],
      'max-h': [ 'full', 'screen', 'md:screen' ],
      'opacity': [ '0', '50'],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with table utility', () => {
    const result = processor.attributify({
      'table': [
        'default', 'inline', 'caption', 'cell', 'column', 'column-group', 'footer-group', 'header-group', 'row-group', 'row', // display
        'auto', 'fixed', // table-layout
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with animate appearance cursor outline pointer resize select fill stroke sr blend', () => {
    const result = processor.attributify({
      'animate': ['none', 'spin', 'ping'],
      'appearance': 'none',
      'cursor': ['auto', 'default', 'pointer'],
      'outline': ['none', 'white'],
      'pointer': ['none', 'auto'],
      'resize': ['none', 'x', 'y', 'both'],
      'select': ['none', 'text', 'all', 'auto'],
      'fill': ['current', 'gray-200'],
      'stroke': [
        'current', 'blue-500', // stroke
        '0', '2', // stroke-width
      ],
      'sr': ['only', 'not-only'],
      'blend': ['normal', 'overlay', 'color-burn'], // mix-blend-mode
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with object utility', () => {
    const result = processor.attributify({
      'object': [
        'contain', 'cover', 'fill', 'none', 'scale-down', // object-fit
        'bottom', 'center', 'left-bottom', 'right-top', // object-position
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with overflow utility', () => {
    const result = processor.attributify({
      'overflow': [
        'auto', 'hidden', 'visible', 'scroll', // overflow
        'x-auto', 'x-hidden', 'x-visible', 'x-scroll', // overflow-x
        'y-auto', 'y-hidden', 'y-visible', 'y-scroll', // overflow-y
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with overscroll utility', () => {
    const result = processor.attributify({
      'overscroll': [
        'auto', 'contain', 'none', // overscroll
        'x-auto', 'x-contain', 'x-none',  // overscroll-x
        'y-auto', 'y-contain', 'y-none', // overscroll-y
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with flex utility', () => {
    const result = processor.attributify({
      'flex': [
        'default', 'inline', // display
        'row', 'row-reverse', 'col', 'col-reverse',  // flex-direction
        'wrap', 'wrap-reverse', 'nowrap', // flex-wrap
        '1', 'auto', 'initial', 'none', // flex
        'grow', 'grow-0', // flex-grow
        'shrink', 'shrink-0', // flex-shrink
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with justify utility', () => {
    const result = processor.attributify({
      'justify': [
        'start', 'end', 'evenly', // justify-content
        'content-start', 'content-end', 'content-evenly', // justify-content
        'items-start', 'items-end', 'items-stretch', // justify-items
        'self-auto', 'self-start', 'self-center', // justify-self
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with align utility', () => {
    const result = processor.attributify({
      'align': [
        'center', 'end', // align-content
        'content-center', 'content-end', // align-content
        'items-start', 'items-center', // align-items
        'self-auto', 'self-end', // align-self
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with place utility', () => {
    const result = processor.attributify({
      'place': [
        'start', 'end', 'evenly', // place-content
        'content-start', 'content-end', 'content-evenly', // place-content
        'items-start', 'items-end', 'items-stretch', // place-items
        'self-auto', 'self-start', 'self-center', // place-self
      ],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });

  it('with margin padding space_between', () => {
    const result = processor.attributify({
      'm': ['4', 'x-2', 'y-3', 't-4'],
      'p': ['4', '-x-2', '-y-3', 'r-px'],
      'space': ['x-4', 'y-2', '-x-4'],
    });
    expect(result.ignored.length).toEqual(0);
    expect(result.styleSheet.build()).toMatchSnapshot('css');
  });
});
