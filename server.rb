require 'websocket-eventmachine-server'
require 'json'
require 'securerandom'
require 'openssl'

clients = {}

cert = OpenSSL::X509::Certificate.new(File.read('server.crt'))
pkey = OpenSSL::PKey::RSA.new(File.read('server.key'))

EM.run do
  WebSocket::EventMachine::Server.start(
    host: '0.0.0.0',
    port: 8080,
    secure: true,
    tls_options: {
      private_key_file: 'server.key',
      cert_chain_file: 'server.crt',
      verify_peer: false
    }
  ) do |ws|
    ws.onopen do
      sid = SecureRandom.hex(16)  # Generates a 32-character hexadecimal string
      clients[sid] = ws
      ws.send({ type: 'welcome', sid: sid }.to_json)
      puts "Client connected with id #{sid}"
    end

    ws.onmessage do |msg, type|
      puts "Received message: #{msg}"
      data = JSON.parse(msg)
      case data['type']
      when 'offer', 'answer', 'candidate'
        target_sid = data['target']
        if clients[target_sid]
          clients[target_sid].send(msg)
        end
      when 'register'
        clients[data['sid']] = ws
      end
    end

    ws.onclose do
      clients.delete_if { |sid, client| client == ws }
      puts "Client disconnected"
    end
  end
end
