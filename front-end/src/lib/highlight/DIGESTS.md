## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js"
  integrity="sha384-pGqTJHE/m20W4oDrfxTVzOutpMhjK3uP/0lReY0Jq/KInpuJSXUnk4WAYbciCLqT"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/go.min.js"
  integrity="sha384-Mtb4EH3R9NMDME1sPQALOYR8KGqwrXAtmc6XGxDd0XaXB23irPKsuET0JjZt5utI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-qimhSkVWof5rfaFajQk8KAtzSRYyIArcJCMKWdDcNq34F4uplk08wmEyUiYLmO+3 /es/languages/c.js
sha384-5fESKgrRcGs7I/89bn7NKFcHyvIVcmQIG4JfCEAV5Rg5VVtskrmGkHVOIsD1642v /es/languages/c.min.js
sha384-TPorW0AnOqfb0nnUevNZk4u62DUzbO/H1YjBxhFMfPQT43E+U9n7V1bN4R51yEFY /es/languages/delphi.js
sha384-KYBMbsTREEtzM5JsppWsdLqQsXtLiJkMauViGW5/rWaPzT0wDsU7yRHcjbBKmOt2 /es/languages/delphi.min.js
sha384-BcjZoAx+JfnWI/YaICe1dbsNQwCCBWJKS5uLzyKKMiLTVxBqOIRmaUoiJnYADo0M /es/languages/x86asm.js
sha384-y1FgDrVkuSox/kv/Oib26ZqzunABWyUkirzc4i4sthq8Z7c/ReWp2XA9DCh7MHQh /es/languages/x86asm.min.js
sha384-WHdxyD51Y+ytDdcYGVkKHQOThUwwhLl/1GvZxHTHL4ImI4NS32L/B8bvB/1zN/Mk /languages/c.js
sha384-jtwnwOYA+K4zYN55fA4z4U0PTK5oEp4RcLYaXkYRKO3UUzge1o21ArmvKmTRdh/d /languages/c.min.js
sha384-OYIpfrwVpwa945Xtvjo7YUOg5IXXXP8VeOvrGtPaLE0aILTQkcBEywDnV6DABQzt /languages/delphi.js
sha384-WPXcFtkOLxX0vKdl+zKh+zWbdMF2GV5aWrNbGT4L2qBYLSUxq1KQDWYhJHh8qRrt /languages/delphi.min.js
sha384-9s/ZvqYSxQS2hJrT3LuFUwDyxlWEELd50mRuGXt0zzSwafBqEWPsv9xxNsZUF2W4 /languages/x86asm.js
sha384-cw6YAmvOjrczJAb9NkjJRzsXso0VEJrJsLZl8G49s9vVlIFVwG8cR6K8yvpDlGn5 /languages/x86asm.min.js
sha384-l2RZiLOtICyU7JVnNVYS/cpOyJdw0ojCRZ6Fh6XXDymJFlsvCCdW9q6i97u4Cm9N /highlight.js
sha384-62hEyrCH34JIWmMC0CLW51YtuldQtcDsf0MTplmn41dJJCwfeQnov/20gZ7fPv9T /highlight.min.js
```

