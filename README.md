# age-verification-bypass — Modified Version
 
> **Important Note:** This is **not** my original creation. This project is a modified version (fork) of the original work by [🦊 helloyanis](https://github.com/helloyanis). All credit for the original software goes to them.
 
## About this version
 
This repository contains **my own modified version** of the original project. I have made changes and improvements to the code to make it work even better. You can find the original project here: https://github.com/helloyanis/age-verification-bypass.
 
The original software was released under the **MIT License**, which allows anyone to use, copy, modify, and distribute the software — as long as the original copyright notice is included. I am using that permission to publish this improved version.
 
## What I changed
 
- I renamed **AGE_GATE_PATTERN** to **AGE_GATE_CONFIG**, because "config" implies a structured object holding multiple settings, which is more accurate for an object containing selectors, patterns, and special site rules.
- I added **sanitizeText** function explicitly instead of inline logic where possible.
- I refined the **MutationObserver** callback which explicitly checks **mutation.addedNodes.length**, this ensures we only act when new elements are added (which is how overlays usually appear), reducing unnecessary processing.
- I did isolated the Reddit-specific logic into a clear **if** block.
- I wrapped **content.js** in **(function() { ... })();**, this prevents variables from leaking into the global scope, which is a best practice for browser extensions to avoid conflicts with the website's own JavaScript.

## License
 
This project keeps the original MIT License. As required by the license, the original copyright notice is included below:
 
```
Copyright © 2026 🦊 helloyanis
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
 
Modifications in this version are © 2026 chocie819, also released under the MIT License.
 
## Credits
 
- **Original author:** 🦊 helloyanis
- **Modifications and improvements:** chocie819
