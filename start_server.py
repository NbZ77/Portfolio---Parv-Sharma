#!/usr/bin/env python3
"""
Parv Sharma Portfolio - Local Development & Presentation Server
Launches a lightweight local HTTP server and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching controls for local development
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    port = PORT
    max_retries = 10

    for attempt in range(max_retries):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 65)
                print("  PARV SHARMA - ENGINEERING PORTFOLIO")
                print("  SRM Institute of Science and Technology (ECE)")
                print("=" * 65)
                print(f"  * Serving directory : {DIRECTORY}")
                print(f"  * Local URL        : {url}")
                print(f"  * EMTI Mode        : Available via top bar or shortcut [P]")
                print("=" * 65)
                print("  Press Ctrl+C to stop the server.\n")

                # Automatically open in default browser
                try:
                    webbrowser.open(url)
                except Exception as e:
                    print(f"  (Could not auto-open browser: {e})")

                httpd.serve_forever()
                break
        except OSError as e:
            if "address already in use" in str(e).lower() or getattr(e, 'errno', None) == 98 or getattr(e, 'winerror', None) == 10048:
                print(f"  [Notice] Port {port} is in use. Trying port {port + 1}...")
                port += 1
            else:
                raise e

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n  Portfolio server stopped gracefully.")
        sys.exit(0)
