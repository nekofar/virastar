# Virastar

![Experimental](https://img.shields.io/badge/Status-Experimental-orange?style=flat)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat&logo=typescript)
![PNPM](https://img.shields.io/badge/Package%20Manager-pnpm-red?style=flat&logo=pnpm)


Virastar is a TypeScript library for Persian text processing, providing various functions such as normalization, cleaning, and formatting for better readability and compatibility.

> Please note that Virastar is an experimental project and is currently under development. As such, it may not be suitable for use in production environments. Use at your own risk and discretion.

This project was inspired by the popular [virastar](https://github.com/brothersincode/virastar) npm package created by Brothers in Code. While virastar has been a valuable tool for Persian text processing, this project seeks to build upon its foundation and provide additional functionality and improvements. As such, this library may have a similar API to virastar, but it is not a drop-in replacement and may have different behavior in some cases.

### Installation

To install Virastar, run the following command:

```shell
pnpm add @nekofar/virastar
```

### Usage

To use Virastar, call the `process` function on a `virastar` instance and pass in the data you wish to process. Here's an example:

```typescript
import virastar from '@nekofar/virastar'

const processedText = virastar().process(text)
```
