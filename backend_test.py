import requests
import sys
from datetime import datetime
import json

class APITester:
    def __init__(self, base_url="https://futuristic-webcraft.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_preview": response.text[:100] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_preview": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_blog_posts(self):
        """Test blog posts endpoint"""
        return self.run_test("Get Blog Posts", "GET", "blog", 200)

    def test_blog_categories(self):
        """Test blog categories endpoint"""
        return self.run_test("Get Blog Categories", "GET", "blog-categories", 200)

    def test_seed_blog(self):
        """Test blog seeding endpoint"""
        return self.run_test("Seed Blog Posts", "POST", "seed-blog", 200)

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "business_type": "Small Business",
            "message": "This is a test message from automated testing."
        }
        return self.run_test("Contact Form Submission", "POST", "contact", 200, data=test_data)

    def test_status_endpoint(self):
        """Test status check endpoint"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test("Status Check", "POST", "status", 200, data=test_data)

def main():
    print("🚀 Starting I Design 4 U API Testing...")
    print("=" * 50)
    
    tester = APITester()
    
    # Test all endpoints
    tester.test_root_endpoint()
    tester.test_blog_posts()
    tester.test_blog_categories()
    tester.test_seed_blog()
    tester.test_contact_form()
    tester.test_status_endpoint()
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    # Print failed tests
    failed_tests = [r for r in tester.results if not r['success']]
    if failed_tests:
        print("\n❌ Failed Tests:")
        for test in failed_tests:
            print(f"   - {test['test']}: {test['actual_status']} (expected {test['expected_status']})")
            if test['response_preview']:
                print(f"     Error: {test['response_preview']}")
    
    # Save results to file
    with open('/app/test_reports/backend_api_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%",
            "results": tester.results
        }, f, indent=2)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())