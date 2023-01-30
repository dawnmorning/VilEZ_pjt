package kr.co.vilez.ui.user

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kr.co.vilez.R
import kr.co.vilez.data.model.User
import kr.co.vilez.databinding.ActivityLoginBinding
import kr.co.vilez.ui.HomeFragment
import kr.co.vilez.ui.MainActivity
import kr.co.vilez.ui.dialog.AlertDialog
import kr.co.vilez.util.ApplicationClass
import kr.co.vilez.util.StompClient
import retrofit2.awaitResponse

private const val TAG = "빌리지_LoginActivity"
class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private var waitTime = 0L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_login)
        binding.activity = this

        supportActionBar?.hide() // 액션바 숨김

        val flag = intent.getIntExtra("flag", 1)
        openFragment(flag)  // 가장 첫 화면은 로그인 Fragment로 지정
    }


    override fun onBackPressed() {
        if(System.currentTimeMillis() - waitTime >=1500 ) {
            waitTime = System.currentTimeMillis()
            Toast.makeText(this,"뒤로가기 버튼을 한번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show()
        } else {
            finish() // 액티비티 종료
        }
    }

    fun openFragment(index: Int, id:String? = null) {
        val transaction = supportFragmentManager.beginTransaction()
        when (index) {
            1 -> { // 로그인
                transaction.replace(R.id.frame_layout_login, LoginFragment())
            }
            2 -> { // 회원가입
                startActivity(Intent(this@LoginActivity, RegisterActivity::class.java))
                finish()
                return
            }
            3 -> { // 비밀번호 찾기
                transaction.replace(R.id.frame_layout_login, FindPasswordFragment())
            }
            4-> {
                val intent = Intent(this@LoginActivity, MainActivity::class.java)
                intent.putExtra("target", "나의 빌리지")
                startActivity(intent)
                finish()
                return
            }
            4-> { // 카카오로 로그인
                transaction.replace(R.id.frame_layout_login, RegisterOauthFragment())
                    .addToBackStack(null)
            }
            5-> { // 네이버로 로그인
                transaction.replace(R.id.frame_layout_login, RegisterOauthFragment.newInstance(id!!))
                    .addToBackStack(null)
            }
        }
        transaction.commit()
    }

    fun login(user: User) {
        CoroutineScope(Dispatchers.Main).launch {
            val result =
                ApplicationClass.retrofitUserService.getLoginResult(user).awaitResponse().body()
            if (result?.flag == "success") {
                Log.d(TAG, "로그인 성공, 받아온 user = ${result.data[0]}")
                ApplicationClass.prefs.setUser(result.data[0])
                ApplicationClass.prefs.setAutoLogin(user) // 로그인시 자동으로 자동로그인 넣기

                StompClient.runStomp()

                val resultDetail = ApplicationClass.retrofitUserService.getUserDetail(result.data[0].id).awaitResponse().body()
                if(resultDetail?.flag == "success") {
                    Log.d(TAG, "login: Detail조회도 로그인와 같이 성공~, result: ${resultDetail.data[0]}")
                    ApplicationClass.prefs.setUserDetail(resultDetail.data[0])
                }

                val intent = Intent(this@LoginActivity, MainActivity::class.java)
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                startActivity(intent)
            } else {
                Log.d(TAG, "login: 로그인 실패, result:$result")
                val dialog = AlertDialog(this@LoginActivity, "로그인에 실패했습니다.\n다시 시도 해주세요")
                dialog.show(supportFragmentManager, "NaverRegisterFailed")
            }
        }
    }
}