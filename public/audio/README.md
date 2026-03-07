# Audio Assets

The audio files in this directory are gitignored due to copyright.

## `escape-from-the-city.m4a`

Used by the Chaos Emerald success modal. To restore after cloning:

```bash
yt-dlp -f "bestaudio[ext=m4a]" \
  "https://soundcloud.com/sonicunleashed/sonic-adventure-2-escape-from-the-city" \
  -o "public/audio/escape-from-the-city.m4a"
```

Requires [yt-dlp](https://github.com/yt-dlp/yt-dlp): `pip install yt-dlp`
