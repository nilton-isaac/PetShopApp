import React from 'react';
import { Platform, Pressable, type PressableProps } from 'react-native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

type Props = PressableProps & { href: string; children?: React.ReactNode };

export function ExternalLink({ href, children, onPress, ...rest }: Props) {
  if (Platform.OS === 'web') {
    return (
      // @ts-expect-error JSX intrinsic 'a' exists on web builds
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Pressable
      {...rest}
      onPress={async (e) => {
        if (onPress) onPress(e);
        if (!e.defaultPrevented) {
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    >
      {children}
    </Pressable>
  );
}
