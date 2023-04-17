import {
  trigger,
  animate,
  transition,
  style,
  query,
  state,
  keyframes,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    // query(
    //     ':leave',
    //     [style({ opacity: 1 }), animate('0.1s', style({ opacity: 0 }))],
    //     { optional: true }
    // ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      {
        optional: true,
      }
    ),
  ]),
]);

export const FadeInOutAnimation = [
  trigger('fadeInOutAnimation', [
    state(
      'false',
      style({
        opacity: 0,
      })
    ),
    state(
      'true',
      style({
        opacity: 1,
      })
    ),
    transition('true => false', animate('0s ease-out')),
    transition('false => true', animate('0.5s ease-in')),
  ]),
];

export const EaseInOutAnimation = trigger('easeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0s ease-out', style({ opacity: 0 })),
  ]),
]);

export const FadingAnimation = [
  trigger('fadingAnimation', [
    transition('* => *', [
      style({ opacity: 0 }),
      animate('0.6s ease-in', style({ opacity: 1 })),
    ]),
  ]),
];

export const ChangeValueAnimation = [
  trigger('changeValueAnimation', [
    transition('void => 0', []),
    transition('void => *', [
      style({ opacity: 0, height: '0px' }),
      animate('0.4s ease-in', style({ height: '*' })),
      animate('0.2s ease-in', style({ opacity: 1 })),
    ]),
    transition('* => void', [
      style({ opacity: 1, height: '*' }),
      animate('0.2s ease-out', style({ opacity: 0 })),
      animate('0.4s ease-out', style({ height: '0px' })),
    ]),
    transition('* => *', [
      style({ opacity: 0 }),
      animate('0.6s ease-in', style({ opacity: 1 })),
    ]),
  ]),
];

export const ChangeBackgroundAnimation = [
  trigger('changeBackgroundAnimation', [
    state(
      '0',
      style({
        opacity: 0,
      })
    ),
    state(
      '1',
      style({
        opacity: 1,
      })
    ),
    transition('1 => 0', [
      style({ opacity: 0 }),
      animate('0.5s', style({ opacity: 0 })),
    ]),

    transition('0 => 1', [
      style({ opacity: 0 }),
      animate(
        '1s',
        keyframes([
          style({
            opacity: 0.5,
            offset: 0.5,
          }),
          style({ opacity: 1, offset: 1 }),
        ])
      ),
    ]),
  ]),
];

export const InOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0, height: '0px' }),
    animate('1s ease-in', style({ opacity: 1, height: '*' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*' }),
    animate('1s ease-out', style({ opacity: 0, height: '0px' })),
  ]),
]);
