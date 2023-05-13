import nodepyrunner
import threading
import time
import psutil
import winreg
import json

# 字节转换GB
def bytes_to_gb(sizes):
    sizes = round(sizes / (1024 ** 3), 2)
    return sizes

# 获取内存信息
def menory_info():
    data = dict(
        menory_total=psutil.virtual_memory().total,  # 内容总量
        menory_total_gb=bytes_to_gb(psutil.virtual_memory().total),  # 内容总量
        menory_available=psutil.virtual_memory().available,  # 内容可用量
        menory_available_gb=bytes_to_gb(psutil.virtual_memory().available),  # 内容可用量
        menory_percent=psutil.virtual_memory().percent,  # 内存使用率
        menory_used=psutil.virtual_memory().used,  # 内存使用量
        menory_used_gb=bytes_to_gb(psutil.virtual_memory().used),  # 内存使用量
    )
    return data

# 获取CPU信息
def cpu_info():
    # 注册表读取CPU名称
    key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"HARDWARE\DESCRIPTION\System\CentralProcessor\0")
    cpu_name = winreg.QueryValueEx(key, "ProcessorNameString")
    key.Close()
    # CPU使用信息
    data = dict(
        cpu_name=cpu_name[0],
        cpu_avg=psutil.cpu_percent(interval=0, percpu=False),  # cpu平均使用率
        per_cpu_avg=psutil.cpu_percent(interval=0, percpu=True),  # 每个cpu使用率
        cpu_core=psutil.cpu_count(False),  # cpu物理核心数量
        cpu_logic=psutil.cpu_count(True)  # cpu逻辑核心数量
    )
    return data

# CPU监视线程
def cpu_monitor():
    while(True):
        time.sleep(1)
        data = cpu_info()
        j_str = json.dumps(data)
        nodepyrunner.callJs(target='UpdataCPU', args=[j_str])

# 内存监视线程
def menory_monitor():
    while(True):
        time.sleep(1)
        data = menory_info()
        j_str = json.dumps(data)
        nodepyrunner.callJs(target='UpdateMenory', args=[j_str])    

def start():
    t_cpu = threading.Thread(target=cpu_monitor, args=())
    t_cpu.start()
    t_menory = threading.Thread(target=menory_monitor, args=())
    t_menory.start()