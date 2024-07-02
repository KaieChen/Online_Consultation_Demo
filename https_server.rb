require 'webrick'
require 'webrick/https'
require 'openssl'

cert = OpenSSL::X509::Certificate.new(File.read('server.crt'))
pkey = OpenSSL::PKey::RSA.new(File.read('server.key'))

server = WEBrick::HTTPServer.new(
  Port: 8443,
  SSLEnable: true,
  SSLCertificate: cert,
  SSLPrivateKey: pkey,
  SSLCertName: [["CN", WEBrick::Utils::getservername]]
)

server.mount_proc '/' do |req, res|
  res.body = File.read('index.html')
end

trap('INT') { server.shutdown }
server.start
