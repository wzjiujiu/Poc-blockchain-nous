/**
 * Truffle configuration file
 * Configurato per l’uso con Ganache UI su localhost:7545
 */

module.exports = {
  // 🔹 Configurazione delle reti
  networks: {
    // Rete locale di sviluppo (Ganache UI)
    development: {
      host: "127.0.0.1",      // Indirizzo locale
      port: 7545,             // Porta RPC di Ganache (verificala nella UI)
      network_id: "*",        // Qualsiasi network ID (oppure usa "5777")
    },
  },

  // 🔹 Configurazione compilatore Solidity
  compilers: {
    solc: {
      version: "0.8.21",       // Versione del compilatore
      settings: {
        optimizer: {
          enabled: true,       // Ottimizzazione bytecode
          runs: 200
        },
        evmVersion: "london",  // Compatibile con Ganache/Ethereum recenti
      },
    },
  },

  // 🔹 Configurazioni opzionali (directory, mocha, ecc.)
  db: {
    enabled: false,            // Disabilita database Truffle (non necessario)
  },

  mocha: {
    // Impostazioni test (opzionali)
    timeout: 100000
  },
}; // 👈 assicurati che ci sia questa graffa e il punto e virgola finale

