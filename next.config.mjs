/** @type {import('next').NextConfig} */
const nextConfig = {
  // remove header x-powered-by (menos metadados, levemente mais seguro)
  poweredByHeader: false,
  // compressão gzip no servidor de produção
  compress: true,
};

export default nextConfig;
